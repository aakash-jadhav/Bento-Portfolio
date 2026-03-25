import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { clearSession, readSession, writeSession } from '../auth'

type AuthContextValue = {
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
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

  const login = useCallback((email: string, password: string) => {
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()
    if (!trimmedEmail || !trimmedPassword) return false

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
