/** Simple client-side session flag (replace with real auth / API later). */
export const AUTH_STORAGE_KEY = 'bento_resume_admin_session'

export function readSession(): boolean {
  try {
    return localStorage.getItem(AUTH_STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function writeSession(): void {
  localStorage.setItem(AUTH_STORAGE_KEY, '1')
}

export function clearSession(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}
