/** Base URL for the API. Empty = same origin (use Vite dev proxy `/api` → backend). */
export function getApiBase(): string {
  return (import.meta.env.VITE_API_URL ?? '').toString().replace(/\/$/, '')
}

/** True when `VITE_API_URL` is set (production API on Render, etc.). Do not fall back to bundled `siteContent.json`. */
export function isRemoteApiConfigured(): boolean {
  return Boolean(getApiBase())
}

/** Build an absolute API path. */
export function apiUrl(path: string): string {
  const base = getApiBase()
  const p = path.startsWith('/') ? path : `/${path}`
  if (!base) return p
  return `${base}${p}`
}
