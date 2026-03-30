import type { ReactNode } from 'react'
import type { TagTone } from './types'
import { cx } from './utils'

export function Tag({
  tone,
  appearance = 'default',
  children,
}: {
  tone: TagTone
  /** Skills card: solid white pill chips */
  appearance?: 'default' | 'skills'
  children: ReactNode
}) {
  if (appearance === 'skills') {
    return (
      <span
        className={cx(
          'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
          'bg-white text-slate-800 ring-1 ring-slate-900/10 shadow-[0_1px_0_rgba(15,23,42,0.04)]',
        )}
      >
        {children}
      </span>
    )
  }

  const base =
    'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1'
  const s =
    tone === 'purple' || tone === 'about'
      ? 'bg-white/60 text-slate-700 ring-slate-900/10'
      : tone === 'green'
        ? 'bg-white/60 text-slate-700 ring-slate-900/10'
        : tone === 'pink'
          ? 'bg-white/60 text-slate-700 ring-slate-900/10'
          : tone === 'beige'
            ? 'bg-white/60 text-slate-700 ring-slate-900/10'
            : tone === 'blue'
              ? 'bg-white/60 text-slate-700 ring-slate-900/10'
              : 'bg-white/60 text-slate-700 ring-slate-900/10'
  return <span className={cx(base, s)}>{children}</span>
}
