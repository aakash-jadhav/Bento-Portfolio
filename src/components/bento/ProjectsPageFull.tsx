import { Icon } from './Icon'
import { PROJECT_GRID_ITEMS } from './projectsData'
import { ProjectGridCard } from './cards/ProjectGridCard'
import { cx } from './utils'

export function ProjectsPageFull({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-2 lg:gap-3">
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
        {PROJECT_GRID_ITEMS.map((p) => (
          <ProjectGridCard key={p.title} {...p} />
        ))}
      </div>
    </div>
  )
}
