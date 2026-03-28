import { apiUrl } from './apiBase'
import { readAuthToken } from './auth'

export async function fetchResumeOnServer(): Promise<boolean> {
  try {
    const res = await fetch(apiUrl('/api/resume/status'), { cache: 'no-store' })
    if (!res.ok) return false
    const j = (await res.json()) as { hasResume?: boolean }
    return Boolean(j.hasResume)
  } catch {
    return false
  }
}

export async function uploadResumePdfToServer(file: File): Promise<void> {
  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    throw new Error('Please choose a PDF file.')
  }
  const token = readAuthToken()
  if (!token) throw new Error('You need to be signed in.')

  const res = await fetch(apiUrl('/api/resume'), {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/pdf',
    },
    body: file,
  })

  if (!res.ok) {
    let msg = `Upload failed (${res.status})`
    try {
      const j = (await res.json()) as { error?: string }
      if (j.error) msg = j.error
    } catch {
      // ignore
    }
    throw new Error(msg)
  }
}
