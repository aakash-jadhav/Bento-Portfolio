import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, Lock, Mail } from 'lucide-react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const primary = '#4f46e5'
const inputBg = '#f3f4f6'

export function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { from?: string } | undefined
  const from = state?.from?.startsWith('/') ? state.from : '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
<<<<<<< HEAD
=======
  const [submitting, setSubmitting] = useState(false)
>>>>>>> 2b523b1 (Add initial project structure with essential files and configurations)

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

<<<<<<< HEAD
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    const ok = login(email, password)
    if (!ok) {
      setError('Please enter email and password.')
      return
    }
    navigate(from, { replace: true })
=======
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const ok = await login(email, password)
      if (!ok) {
        setError('Invalid email or password, or server unreachable.')
        return
      }
      navigate(from, { replace: true })
    } finally {
      setSubmitting(false)
    }
>>>>>>> 2b523b1 (Add initial project structure with essential files and configurations)
  }

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden overflow-y-auto bg-[#f5f6f8] font-sans text-[#0f172a]">
      {/* Soft radial glow behind the card */}
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] h-[min(520px,70vh)] w-[min(900px,95vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90"
        style={{
          background: `radial-gradient(ellipse at center, rgba(79, 70, 229, 0.14) 0%, rgba(79, 70, 229, 0.04) 45%, transparent 70%)`,
        }}
        aria-hidden
      />

      {/* Main */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-12 sm:py-16">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6366f1]">
          Admin access
        </p>
        <h1 className="mt-2 text-center text-[32px] font-bold leading-tight tracking-tight text-[#0f172a] sm:text-[36px]">
          Welcome Back
        </h1>

        <div className="mt-10 w-full max-w-[420px] rounded-2xl border border-black/6 bg-white p-8 shadow-[0_24px_64px_-12px_rgba(15,23,42,0.12),0_0_0_1px_rgba(15,23,42,0.04)] sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64748b]"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#94a3b8]"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border-0 py-3 pl-11 pr-3 text-[15px] text-[#0f172a] outline-none ring-1 ring-transparent transition placeholder:text-[#94a3b8] focus:ring-2 focus:ring-[#4f46e5]/35"
                  style={{ backgroundColor: inputBg }}
                  placeholder="curator@studio.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64748b]"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#94a3b8]"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border-0 py-3 pl-11 pr-3 text-[15px] text-[#0f172a] outline-none ring-1 ring-transparent transition placeholder:text-[#94a3b8] focus:ring-2 focus:ring-[#4f46e5]/35"
                  style={{ backgroundColor: inputBg }}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <button
              type="submit"
<<<<<<< HEAD
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] font-semibold text-white shadow-sm transition hover:brightness-[1.05] active:brightness-95"
              style={{ backgroundColor: primary }}
            >
              Continue
=======
              disabled={submitting}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] font-semibold text-white shadow-sm transition hover:brightness-[1.05] active:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ backgroundColor: primary }}
            >
              {submitting ? 'Signing in…' : 'Continue'}
>>>>>>> 2b523b1 (Add initial project structure with essential files and configurations)
              <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.25} aria-hidden />
            </button>
          </form>
        </div>

        <p className="mt-8 max-w-[420px] text-center text-[13px] text-[#94a3b8]">
          Secure portal for the primary curator.
        </p>

        <p className="mt-6 text-center text-[13px] text-[#94a3b8]">
          <Link to="/" className="font-medium text-[#6366f1] transition hover:text-[#4f46e5]">
            ← Back to site
          </Link>
        </p>
      </main>

      {/* Bottom footer */}
      <footer className="relative z-10 mt-auto border-t border-black/6 bg-[#f0f1f4]/80">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-[13px] font-semibold text-[#334155]">Curator Portfolio</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-[#94a3b8]">
              © 2024 The Digital Curator. Crafted with soft minimalism.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8]">
            <a href="#" className="transition hover:text-[#64748b]">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-[#64748b]">
              Terms of Service
            </a>
            <a href="#" className="transition hover:text-[#64748b]">
              LinkedIn
            </a>
            <a href="#" className="transition hover:text-[#64748b]">
              Dribbble
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
