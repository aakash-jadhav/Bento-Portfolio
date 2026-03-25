import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  DEFAULT_SITE_CONTENT,
} from '../data/siteContentDefaults'
import type {
  PortfolioContent,
  ProjectEditorEntry,
  SiteContent,
} from '../data/siteContentTypes'

async function loadFromFile(): Promise<SiteContent | null> {
  try {
    // `public/` assets are served at the site root.
    const res = await fetch('/siteContent.json', { cache: 'no-store' })
    if (!res.ok) return null
    const parsed = (await res.json()) as SiteContent
    if (!parsed?.portfolio || !Array.isArray(parsed.projects)) return null
    return parsed
  } catch {
    return null
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
    return DEFAULT_SITE_CONTENT
  })

  useEffect(() => {
    let cancelled = false
    loadFromFile().then((loaded) => {
      if (cancelled) return
      if (loaded) setSiteContent(loaded)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const setPortfolio = useCallback((next: PortfolioContent) => {
    setSiteContent((prev) => {
      const merged: SiteContent = { ...prev, portfolio: next }
      return merged
    })
  }, [])

  const setProjects = useCallback((next: ProjectEditorEntry[]) => {
    setSiteContent((prev) => {
      const merged: SiteContent = { ...prev, projects: next }
      return merged
    })
  }, [])

  const resetSiteContent = useCallback(() => {
    setSiteContent(structuredClone(DEFAULT_SITE_CONTENT))
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
