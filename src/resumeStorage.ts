const DB_NAME = 'bento_resume_files_v1'
const STORE_NAME = 'files'
const RESUME_ID = 'resumePdf'

type ResumeRecord = {
  id: string
  blob: Blob
  filename: string
  mime: string
  updatedAt: number
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)

    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }

    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function withStore<T>(
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => Promise<T>,
): Promise<T> {
  const db = await openDb()
  try {
    return await new Promise<T>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, mode)
      const store = tx.objectStore(STORE_NAME)
      fn(store)
        .then((v) => resolve(v))
        .catch((e) => reject(e))
      tx.onerror = () => reject(tx.error)
    })
  } finally {
    db.close()
  }
}

export async function putResumePdf(file: File): Promise<void> {
  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    throw new Error('Resume must be a PDF')
  }

  const record: ResumeRecord = {
    id: RESUME_ID,
    blob: file.slice(0, file.size, 'application/pdf'),
    filename: file.name,
    mime: 'application/pdf',
    updatedAt: Date.now(),
  }

  await withStore('readwrite', async (store) => {
    await new Promise<void>((resolve, reject) => {
      const req = store.put(record)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  })

  window.dispatchEvent(new Event('bento_resume_pdf_updated'))
}

export async function getResumePdf(): Promise<{
  blob: Blob
  filename: string
} | null> {
  return await withStore('readonly', async (store) => {
    return await new Promise<{ blob: Blob; filename: string } | null>((resolve, reject) => {
      const req = store.get(RESUME_ID)
      req.onsuccess = () => {
        const result = req.result as ResumeRecord | undefined
        if (!result) return resolve(null)
        resolve({ blob: result.blob, filename: result.filename })
      }
      req.onerror = () => reject(req.error)
    })
  })
}

export async function downloadResumePdf(): Promise<void> {
  const rec = await getResumePdf()
  if (!rec) {
    // Fallback: allow a default PDF in `/public` if present.
    const res = await fetch('/resume.pdf', { cache: 'no-store' })
    if (!res.ok) throw new Error('No resume uploaded')
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'resume.pdf'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    return
  }

  const url = URL.createObjectURL(rec.blob)
  const a = document.createElement('a')
  a.href = url
  // Always treat the stored PDF as the resume and always download as `resume.pdf`
  // (ignores the original upload filename).
  a.download = 'resume.pdf'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

