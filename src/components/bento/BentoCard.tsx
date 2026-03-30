import type { ReactNode } from 'react'
import type { TagTone } from './types'
import { cx, BENTO_RADIUS } from './utils'

export function BentoCard({
  tone,
  title,
  icon,
  right,
  children,
  className,
  headerVariant = 'default',
  headerLabelClassName,
  padding = 'md',
}: {
  tone: TagTone
  title?: string
  icon?: ReactNode
  right?: ReactNode
  children: ReactNode
  className?: string
  /**
   * `split` = icon top-left, uppercase label top-right (pattern from About + Summary cards).
   * Pass `headerLabelClassName` for the darker accent color.
   */
  headerVariant?: 'default' | 'split'
  headerLabelClassName?: string
  padding?: 'sm' | 'md' | 'lg' | 'comfortable'
}) {
  const bg =
    tone === 'purple'
      ? 'bg-[#E6E6FA]'
      : tone === 'about'
        ? 'bg-[#E8EDFF]'
        : tone === 'green'
          ? 'bg-[#E0FDF0]'
          : tone === 'pink'
            ? 'bg-[#FDF1F5]'
            : tone === 'beige'
              ? 'bg-[#F8EBE0]'
              : tone === 'blue'
                ? 'bg-[#E0F2FE]'
                : tone === 'skills'
                  ? 'bg-[#E8EAF6]'
                  : tone === 'resume'
                    ? 'bg-[#F5F3FF]'
                    : 'bg-white'

  const pad =
    padding === 'comfortable'
      ? { x: 'px-6', pt: 'pt-5', pb: 'pb-6' }
      : padding === 'lg'
        ? { x: 'px-6', pt: 'pt-6', pb: 'pb-6' }
        : padding === 'sm'
          ? { x: 'px-4', pt: 'pt-3', pb: 'pb-3' }
          : { x: 'px-5', pt: 'pt-5', pb: 'pb-5' }

  const splitHeader = headerVariant === 'split'
  const hasHeader = splitHeader
    ? Boolean(icon || title)
    : Boolean(title || right || icon)
  const headerPt = splitHeader ? (padding === 'sm' ? 'pt-2' : 'pt-2.5') : pad.pt

  const bodyTop = (() => {
    if (!hasHeader) {
      if (padding === 'comfortable') return 'pt-5'
      if (padding === 'lg') return 'pt-6'
      if (padding === 'sm') return 'pt-3'
      return 'pt-5'
    }
    if (splitHeader) {
      if (padding === 'comfortable') return 'pt-3'
      if (padding === 'sm') return 'pt-2'
      return 'pt-4'
    }
    return 'pt-3'
  })()

  return (
    <section
      className={cx(
        'flex min-h-0 flex-col overflow-hidden border border-slate-900/5 shadow-sm shadow-slate-900/5',
        BENTO_RADIUS,
        'backdrop-blur-[2px]',
        bg,
        className,
      )}
    >
      {hasHeader && (
        <header
          className={cx(
            'flex items-center justify-between',
            splitHeader ? 'gap-2' : 'gap-3',
            pad.x,
            headerPt,
          )}
        >
          {splitHeader ? (
            <>
              <span className="grid min-w-0 shrink place-items-center">{icon}</span>
              {title ? (
                <div
                  className={cx(
                    'max-w-[58%] text-right font-bold uppercase leading-snug',
                    headerLabelClassName ??
                      'text-xs tracking-[0.18em] text-slate-700',
                  )}
                >
                  {title.toUpperCase()}
                </div>
              ) : null}
            </>
          ) : (
            <>
              <div className="flex min-w-0 items-center gap-3">
                {icon && (
                  <span
                    className={cx(
                      'grid h-9 w-9 shrink-0 place-items-center bg-white/65 ring-1 ring-slate-900/5',
                      BENTO_RADIUS,
                    )}
                  >
                    {icon}
                  </span>
                )}
                {title && (
                  <div className="text-[11px] font-semibold tracking-[0.16em] text-slate-700/70">
                    {title.toUpperCase()}
                  </div>
                )}
              </div>
              {right}
            </>
          )}
        </header>
      )}
      <div
        className={cx(
          'flex min-h-0 flex-1 flex-col',
          pad.x,
          pad.pb,
          bodyTop,
        )}
      >
        {children}
      </div>
    </section>
  )
}
