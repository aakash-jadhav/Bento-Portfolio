import { useSiteContentOptional } from '../../contexts/SiteContentContext'
import { DEFAULT_SITE_CONTENT } from '../../data/siteContentDefaults'
import { Icon } from './Icon'
import { ProjectGridCard } from './cards/ProjectGridCard'
import { cx } from './utils'
import { useCallback, useRef, useState } from 'react'

export function ProjectsPageFull({ onBack }: { onBack: () => void }) {
  const site = useSiteContentOptional()
  const projects = site?.siteContent.projects ?? DEFAULT_SITE_CONTENT.projects

  const [toast, setToast] = useState(false)
  const toastTimer = useRef<number | null>(null)

  const copyText = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.setAttribute('readonly', 'true')
        ta.style.position = 'absolute'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
    } catch {
      // ignore; toast still shows for UX
    }

    setToast(true)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(false), 2000)
  }, [])

  return (
    <div className="flex h-full min-h-0 flex-col gap-2 lg:gap-3">
      {toast ? (
        <div
          className="fixed bottom-4 left-4 z-50 rounded-lg bg-slate-900/85 px-3 py-2 text-xs font-semibold text-white shadow-lg"
          role="status"
          aria-live="polite"
        >
          Copied
        </div>
      ) : null}
      <header className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className={cx(
            'cursor-pointer inline-flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-2.5 py-1.5',
            'text-xs font-semibold text-slate-800 shadow-sm shadow-slate-900/5',
            'hover:bg-slate-50',
          )}
          aria-label="Back to portfolio"
        >
          <Icon name="arrow-left" className="h-3.5 w-3.5 shrink-0" pathClassName="stroke-slate-800" />
          Back
        </button>
        <span className="text-xs font-semibold text-slate-900">Projects</span>
      </header>

      <div
        className={cx(
          'grid gap-2 lg:gap-3',
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {projects.map((p, idx) => (
          <ProjectGridCard key={`${p.title}-${idx}`} {...p} onCopy={copyText} />
        ))}
      </div>
    </div>
  )
}
