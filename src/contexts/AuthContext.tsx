import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
<<<<<<< HEAD
=======
import { apiUrl } from '../apiBase'
>>>>>>> 2b523b1 (Add initial project structure with essential files and configurations)
import { clearSession, readSession, writeSession } from '../auth'

type AuthContextValue = {
  isAuthenticated: boolean
<<<<<<< HEAD
  login: (email: string, password: string) => boolean
=======
  login: (email: string, password: string) => Promise<boolean>
>>>>>>> 2b523b1 (Add initial project structure with essential files and configurations)
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => readSession())

  useEffect(() => {
    const onStorage = () => setIsAuthenticated(readSession())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

<<<<<<< HEAD
  const login = useCallback((email: string, password: string) => {
=======
  const login = useCallback(async (email: string, password: string) => {
>>>>>>> 2b523b1 (Add initial project structure with essential files and configurations)
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()
    if (!trimmedEmail || !trimmedPassword) return false

<<<<<<< HEAD
    // Client-side credential check using Vite env vars (VITE_* are exposed to the browser).
    const expectedEmail = (import.meta.env.VITE_ADMIN_EMAIL ?? '').toString()
    const expectedPassword = (import.meta.env.VITE_ADMIN_PASSWORD ?? '').toString()
    if (!expectedEmail || !expectedPassword) return false

    const ok =
      trimmedEmail === expectedEmail && trimmedPassword === expectedPassword
    if (!ok) return false

    writeSession()
    setIsAuthenticated(true)
    return true
=======
    try {
      const res = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          password: trimmedPassword,
        }),
      })
      const data = (await res.json().catch(() => null)) as { token?: string; error?: string } | null
      if (!res.ok || !data?.token) return false

      writeSession(data.token)
      setIsAuthenticated(true)
      return true
    } catch {
      return false
    }
>>>>>>> 2b523b1 (Add initial project structure with essential files and configurations)
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setIsAuthenticated(false)
  }, [])

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
