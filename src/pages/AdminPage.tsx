import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PortfolioAdminTab } from '../components/admin/PortfolioAdminTab'
import { ProjectsAdminTab } from '../components/admin/ProjectsAdminTab'
import { useAuth } from '../contexts/AuthContext'

type AdminTab = 'portfolio' | 'projects'

export function AdminPage() {
  const { logout } = useAuth()
  const [tab, setTab] = useState<AdminTab>('portfolio')

  return (
    <div className="flex min-h-dvh flex-col bg-[#f5f6f8] font-sans text-[#0f172a] lg:h-dvh lg:max-h-dvh lg:overflow-hidden">
      <header className="shrink-0 border-b border-black/6 bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <h1 className="text-[15px] font-bold tracking-tight text-[#0f172a]">
            Admin Panel
          </h1>

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

      <main className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col px-4 pb-4 pt-2 sm:px-6 lg:min-h-0 lg:overflow-hidden">
        {tab === 'portfolio' ? <PortfolioAdminTab /> : <ProjectsAdminTab />}
      </main>
    </div>
  )
}
