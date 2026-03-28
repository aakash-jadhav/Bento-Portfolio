<<<<<<< HEAD
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
=======
/** Admin JWT from POST /api/auth/login (stored after successful login). */
export const AUTH_STORAGE_KEY = 'bento_resume_admin_session'

function isLikelyJwt(value: string): boolean {
  const parts = value.split('.')
  return parts.length === 3 && value.length > 40
}

export function readAuthToken(): string | null {
  try {
    const t = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!t) return null
    if (t === '1' || !isLikelyJwt(t)) return null
    return t
  } catch {
    return null
  }
}

export function readSession(): boolean {
  return readAuthToken() !== null
}

export function writeSession(token: string): void {
  localStorage.setItem(AUTH_STORAGE_KEY, token)
>>>>>>> 2b523b1 (Add initial project structure with essential files and configurations)
}

export function clearSession(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}
