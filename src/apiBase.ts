/** Base URL for the API. Empty = same origin (use Vite dev proxy `/api` → backend). */
export function getApiBase(): string {
  return (import.meta.env.VITE_API_URL ?? '').toString().replace(/\/$/, '')
}

/** Build an absolute API path. */
export function apiUrl(path: string): string {
  const base = getApiBase()
  const p = path.startsWith('/') ? path : `/${path}`
  if (!base) return p
  return `${base}${p}`
}
