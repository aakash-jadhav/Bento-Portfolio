import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PortfolioAdminTab } from '../components/admin/PortfolioAdminTab'
import { ProjectsAdminTab } from '../components/admin/ProjectsAdminTab'
import { useAuth } from '../contexts/AuthContext'
import { useSiteContent } from '../contexts/SiteContentContext'

type AdminTab = 'portfolio' | 'projects'

export function AdminPage() {
  const { logout } = useAuth()
  const { saveError, clearSaveError } = useSiteContent()
  const [tab, setTab] = useState<AdminTab>('portfolio')

  return (
    <div className="flex min-h-dvh flex-col bg-[#f5f6f8] font-sans text-[#0f172a] lg:h-dvh lg:max-h-dvh lg:overflow-hidden">
      <header className="shrink-0 border-b border-black/6 bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <img
              src="/portfolio%20logo.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 shrink-0"
              decoding="async"
            />
            <div className="min-w-0">
              <h1 className="text-[15px] font-bold tracking-tight text-[#0f172a]">
                Aakash Jadhav
              </h1>
              <p className="text-xs font-medium text-[#64748b]">Admin</p>
            </div>
          </div>

          <nav className="flex flex-1 items-center justify-center gap-0 sm:gap-1">
            <button
              type="button"
              onClick={() => setTab('portfolio')}
              className={`relative cursor-pointer px-4 py-2 text-sm font-semibold transition ${
                tab === 'portfolio'
                  ? 'text-[#4f46e5]'
                  : 'text-[#64748b] hover:text-[#334155]'
              }`}
            >
              Portfolio
              {tab === 'portfolio' ? (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#4f46e5]" />
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setTab('projects')}
              className={`relative cursor-pointer px-4 py-2 text-sm font-semibold transition ${
                tab === 'projects'
                  ? 'text-[#4f46e5]'
                  : 'text-[#64748b] hover:text-[#334155]'
              }`}
            >
              Projects
              {tab === 'projects' ? (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#4f46e5]" />
              ) : null}
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-sm font-medium text-[#64748b] transition hover:text-[#0f172a]"
            >
              View site
            </Link>
            <button
              type="button"
              onClick={() => logout()}
              className="cursor-pointer rounded-lg bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {saveError ? (
        <div
          className="shrink-0 border-b border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-800 sm:px-6"
          role="alert"
        >
          <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-2">
            <span>{saveError}</span>
            <button
              type="button"
              onClick={() => clearSaveError()}
              className="cursor-pointer rounded-md border border-red-200 bg-white px-2 py-1 text-xs font-semibold text-red-800 hover:bg-red-100/80"
            >
              Dismiss
            </button>
          </div>
        </div>
      ) : null}

      <main className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col px-4 pb-4 pt-2 sm:px-6 lg:min-h-0 lg:overflow-hidden">
        {tab === 'portfolio' ? <PortfolioAdminTab /> : <ProjectsAdminTab />}
      </main>
    </div>
  )
}
