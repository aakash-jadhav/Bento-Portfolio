import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { apiUrl } from '../apiBase'
import { clearSession, readSession, writeSession } from '../auth'

type AuthContextValue = {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
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

  const login = useCallback(async (email: string, password: string) => {
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()
    if (!trimmedEmail || !trimmedPassword) return false

    try {
      const res = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          password: trimmedPassword,
        }),
      })
      const data = (await res.json().catch(() => null)) as
        | { token?: string; error?: string }
        | null
      if (!res.ok || !data?.token) return false

      writeSession(data.token)
      setIsAuthenticated(true)
      return true
    } catch {
      return false
    }
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
