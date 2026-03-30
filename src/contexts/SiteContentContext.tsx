import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
<<<<<<< HEAD
import {
  DEFAULT_SITE_CONTENT,
} from '../data/siteContentDefaults'
=======
import { apiUrl } from '../apiBase'
import { readAuthToken } from '../auth'
<<<<<<< HEAD
import { DEFAULT_SITE_CONTENT } from '../data/siteContentDefaults'
>>>>>>> 2b523b1 (Add initial project structure with essential files and configurations)
=======
import {
  DEFAULT_SITE_CONTENT,
  normalizeProjectEditorEntry,
  normalizeSiteContent,
} from '../data/siteContentDefaults'
>>>>>>> b89b35d (Update project entries in site content and admin components)
import type {
  PortfolioContent,
  ProjectEditorEntry,
  SiteContent,
} from '../data/siteContentTypes'

<<<<<<< HEAD
async function loadFromFile(): Promise<SiteContent | null> {
  try {
    // `public/` assets are served at the site root.
    const res = await fetch('/siteContent.json', { cache: 'no-store' })
    if (!res.ok) return null
    const parsed = (await res.json()) as SiteContent
    if (!parsed?.portfolio || !Array.isArray(parsed.projects)) return null
    return parsed
=======
const SITE_CONTENT_CACHE_KEY = 'bento_resume_site_content_cache_v1'

function isValidSiteContent(value: unknown): value is SiteContent {
  if (!value || typeof value !== 'object') return false
  const candidate = value as SiteContent
  return Boolean(candidate.portfolio) && Array.isArray(candidate.projects)
}

function loadFromLocalCache(): SiteContent | null {
  try {
    const raw = localStorage.getItem(SITE_CONTENT_CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    return isValidSiteContent(parsed) ? parsed : null
>>>>>>> 2b523b1 (Add initial project structure with essential files and configurations)
  } catch {
    return null
  }
}

<<<<<<< HEAD
=======
function saveToLocalCache(content: SiteContent) {
  try {
    localStorage.setItem(SITE_CONTENT_CACHE_KEY, JSON.stringify(content))
  } catch {
    // ignore storage quota/private mode
  }
}

async function fetchSiteContentFromApi(): Promise<SiteContent | null> {
  try {
    const res = await fetch(apiUrl('/api/site-content'), { cache: 'no-store' })
    if (!res.ok) return null
    const parsed = (await res.json()) as unknown
    return isValidSiteContent(parsed) ? parsed : null
  } catch {
    return null
  }
}

async function loadFromFile(): Promise<SiteContent | null> {
  try {
    const res = await fetch('/siteContent.json', { cache: 'no-store' })
    if (!res.ok) return null
    const parsed = (await res.json()) as unknown
    return isValidSiteContent(parsed) ? parsed : null
  } catch {
    return null
  }
}

async function persistSiteContentToApi(
  content: SiteContent,
): Promise<{ ok: boolean; message?: string }> {
  const token = readAuthToken()
  if (!token) return { ok: false, message: 'Not signed in.' }
  try {
    const res = await fetch(apiUrl('/api/site-content'), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(content),
    })
    if (res.ok) return { ok: true }
    if (res.status === 401) {
      return { ok: false, message: 'Session expired. Sign in again.' }
    }
    let detail = ''
    try {
      const j = (await res.json()) as { error?: string }
      detail = j.error ?? ''
    } catch {
      detail = await res.text()
    }
    return {
      ok: false,
      message: detail || `Save failed (${res.status})`,
    }
  } catch {
    return { ok: false, message: 'Could not reach the server.' }
  }
}

>>>>>>> 2b523b1 (Add initial project structure with essential files and configurations)
type SiteContentContextValue = {
  siteContent: SiteContent
  setPortfolio: (next: PortfolioContent) => void
  setProjects: (next: ProjectEditorEntry[]) => void
  resetSiteContent: () => void
<<<<<<< HEAD
=======
  saveError: string | null
  clearSaveError: () => void
>>>>>>> 2b523b1 (Add initial project structure with essential files and configurations)
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null)

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
<<<<<<< HEAD
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
<<<<<<< HEAD
    return DEFAULT_SITE_CONTENT
  })

  useEffect(() => {
    let cancelled = false
    loadFromFile().then((loaded) => {
      if (cancelled) return
      if (loaded) setSiteContent(loaded)
    })
=======
    return loadFromLocalCache() ?? DEFAULT_SITE_CONTENT
  })
=======
  const [siteContent, setSiteContent] = useState<SiteContent>(() =>
    normalizeSiteContent(loadFromLocalCache() ?? DEFAULT_SITE_CONTENT),
  )
>>>>>>> b89b35d (Update project entries in site content and admin components)
  const [saveError, setSaveError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const fromApi = await fetchSiteContentFromApi()
      if (cancelled) return
      if (fromApi) {
        const next = normalizeSiteContent(fromApi)
        setSiteContent(next)
        saveToLocalCache(next)
        return
      }
      const cached = loadFromLocalCache()
      if (cached) {
        setSiteContent(normalizeSiteContent(cached))
        return
      }
      const loaded = await loadFromFile()
      if (cancelled) return
      if (loaded) {
        const next = normalizeSiteContent(loaded)
        setSiteContent(next)
        saveToLocalCache(next)
      }
    })()
>>>>>>> 2b523b1 (Add initial project structure with essential files and configurations)
    return () => {
      cancelled = true
    }
  }, [])

<<<<<<< HEAD
  const setPortfolio = useCallback((next: PortfolioContent) => {
    setSiteContent((prev) => {
      const merged: SiteContent = { ...prev, portfolio: next }
=======
  const clearSaveError = useCallback(() => setSaveError(null), [])

  const setPortfolio = useCallback((next: PortfolioContent) => {
    setSiteContent((prev) => {
      const merged: SiteContent = { ...prev, portfolio: next }
      saveToLocalCache(merged)
      void persistSiteContentToApi(merged).then((r) => {
        if (!r.ok) setSaveError(r.message ?? 'Save failed')
        else setSaveError(null)
      })
>>>>>>> 2b523b1 (Add initial project structure with essential files and configurations)
      return merged
    })
  }, [])

  const setProjects = useCallback((next: ProjectEditorEntry[]) => {
    setSiteContent((prev) => {
<<<<<<< HEAD
      const merged: SiteContent = { ...prev, projects: next }
<<<<<<< HEAD
=======
=======
      const merged: SiteContent = {
        ...prev,
        projects: next.map(normalizeProjectEditorEntry),
      }
>>>>>>> b89b35d (Update project entries in site content and admin components)
      saveToLocalCache(merged)
      void persistSiteContentToApi(merged).then((r) => {
        if (!r.ok) setSaveError(r.message ?? 'Save failed')
        else setSaveError(null)
      })
>>>>>>> 2b523b1 (Add initial project structure with essential files and configurations)
      return merged
    })
  }, [])

  const resetSiteContent = useCallback(() => {
<<<<<<< HEAD
<<<<<<< HEAD
    setSiteContent(structuredClone(DEFAULT_SITE_CONTENT))
  }, [])

  const value = useMemo(
    () => ({ siteContent, setPortfolio, setProjects, resetSiteContent }),
    [siteContent, setPortfolio, setProjects, resetSiteContent],
=======
    const next = structuredClone(DEFAULT_SITE_CONTENT)
=======
    const next = normalizeSiteContent(structuredClone(DEFAULT_SITE_CONTENT))
>>>>>>> b89b35d (Update project entries in site content and admin components)
    saveToLocalCache(next)
    setSiteContent(next)
    void persistSiteContentToApi(next).then((r) => {
      if (!r.ok) setSaveError(r.message ?? 'Save failed')
      else setSaveError(null)
    })
  }, [])

  const value = useMemo(
    () => ({
      siteContent,
      setPortfolio,
      setProjects,
      resetSiteContent,
      saveError,
      clearSaveError,
    }),
    [
      siteContent,
      setPortfolio,
      setProjects,
      resetSiteContent,
      saveError,
      clearSaveError,
    ],
>>>>>>> 2b523b1 (Add initial project structure with essential files and configurations)
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
