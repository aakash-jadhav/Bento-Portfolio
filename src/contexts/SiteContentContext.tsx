import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { apiUrl, isRemoteApiConfigured } from '../apiBase'
import { readAuthToken } from '../auth'
import {
  DEFAULT_SITE_CONTENT,
  normalizeProjectEditorEntry,
  normalizeSiteContent,
} from '../data/siteContentDefaults'
import type {
  PortfolioContent,
  ProjectEditorEntry,
  SiteContent,
} from '../data/siteContentTypes'

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
  } catch {
    return null
  }
}

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

function getInitialSiteContent(): SiteContent {
  if (import.meta.env.PROD || isRemoteApiConfigured()) {
    return normalizeSiteContent(structuredClone(DEFAULT_SITE_CONTENT))
  }
  return normalizeSiteContent(loadFromLocalCache() ?? DEFAULT_SITE_CONTENT)
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

type SiteContentContextValue = {
  siteContent: SiteContent
  setPortfolio: (next: PortfolioContent) => void
  setProjects: (next: ProjectEditorEntry[]) => void
  resetSiteContent: () => void
  saveError: string | null
  clearSaveError: () => void
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null)

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [siteContent, setSiteContent] = useState<SiteContent>(() =>
    getInitialSiteContent(),
  )
  const [saveError, setSaveError] = useState<string | null>(null)

  const clearSaveError = useCallback(() => setSaveError(null), [])

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

      if (isRemoteApiConfigured()) {
        const cached = loadFromLocalCache()
        if (cached) setSiteContent(normalizeSiteContent(cached))
        return
      }

      if (import.meta.env.PROD) {
        const cached = loadFromLocalCache()
        if (cached) setSiteContent(normalizeSiteContent(cached))
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
    return () => {
      cancelled = true
    }
  }, [])

  const setPortfolio = useCallback((next: PortfolioContent) => {
    setSiteContent((prev) => {
      const merged: SiteContent = { ...prev, portfolio: next }
      saveToLocalCache(merged)
      void persistSiteContentToApi(merged).then((r) => {
        if (!r.ok) setSaveError(r.message ?? 'Save failed')
        else setSaveError(null)
      })
      return merged
    })
  }, [])

  const setProjects = useCallback((next: ProjectEditorEntry[]) => {
    setSiteContent((prev) => {
      const merged: SiteContent = {
        ...prev,
        projects: next.map(normalizeProjectEditorEntry),
      }
      saveToLocalCache(merged)
      void persistSiteContentToApi(merged).then((r) => {
        if (!r.ok) setSaveError(r.message ?? 'Save failed')
        else setSaveError(null)
      })
      return merged
    })
  }, [])

  const resetSiteContent = useCallback(() => {
    const next = normalizeSiteContent(structuredClone(DEFAULT_SITE_CONTENT))
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
