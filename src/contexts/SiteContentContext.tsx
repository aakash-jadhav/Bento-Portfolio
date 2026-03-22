import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import {
  DEFAULT_SITE_CONTENT,
  SITE_CONTENT_STORAGE_KEY,
} from '../data/siteContentDefaults'
import type {
  PortfolioContent,
  ProjectEditorEntry,
  SiteContent,
} from '../data/siteContentTypes'

function loadStored(): SiteContent | null {
  try {
    const raw = localStorage.getItem(SITE_CONTENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as SiteContent
    if (!parsed?.portfolio || !Array.isArray(parsed.projects)) return null
    return parsed
  } catch {
    return null
  }
}

function persist(content: SiteContent) {
  try {
    localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(content))
  } catch {
    // ignore quota / private mode
  }
}

type SiteContentContextValue = {
  siteContent: SiteContent
  setPortfolio: (next: PortfolioContent) => void
  setProjects: (next: ProjectEditorEntry[]) => void
  resetSiteContent: () => void
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null)

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    const stored = loadStored()
    return stored ?? DEFAULT_SITE_CONTENT
  })

  const setPortfolio = useCallback((next: PortfolioContent) => {
    setSiteContent((prev) => {
      const merged: SiteContent = { ...prev, portfolio: next }
      persist(merged)
      return merged
    })
  }, [])

  const setProjects = useCallback((next: ProjectEditorEntry[]) => {
    setSiteContent((prev) => {
      const merged: SiteContent = { ...prev, projects: next }
      persist(merged)
      return merged
    })
  }, [])

  const resetSiteContent = useCallback(() => {
    const next = structuredClone(DEFAULT_SITE_CONTENT)
    persist(next)
    setSiteContent(next)
  }, [])

  const value = useMemo(
    () => ({ siteContent, setPortfolio, setProjects, resetSiteContent }),
    [siteContent, setPortfolio, setProjects, resetSiteContent],
  )

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  )
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext)
  if (!ctx) {
    throw new Error('useSiteContent must be used within SiteContentProvider')
  }
  return ctx
}

/** Optional hook for components that may render outside the provider (e.g. tests). */
export function useSiteContentOptional() {
  return useContext(SiteContentContext)
}
