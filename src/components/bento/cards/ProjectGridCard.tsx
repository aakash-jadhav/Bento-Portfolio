import { BentoCard } from '../BentoCard'
import { Icon } from '../Icon'
import type { IconName } from '../Icon'
import type { TagTone } from '../types'
import { cx } from '../utils'

type Palette = {
  chipBg: string
  chipText: string
  chipRing: string
  stroke: string
  divider: string
  techBg: string
  techText: string
  techRing: string
}

const PALETTES: Record<
  'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'indigo' | 'violet' | 'purple' | 'fuchsia',
  Palette
> = {
  red: {
    chipBg: 'bg-red-200/60',
    chipText: 'text-red-600',
    chipRing: 'ring-red-600/20',
    stroke: 'stroke-red-600',
    divider: 'border-red-600/20',
    techBg: 'bg-red-200/60',
    techText: 'text-red-600',
    techRing: 'ring-red-600/20',
  },
  orange: {
    chipBg: 'bg-orange-200/60',
    chipText: 'text-orange-600',
    chipRing: 'ring-orange-600/20',
    stroke: 'stroke-orange-600',
    divider: 'border-orange-600/20',
    techBg: 'bg-orange-200/60',
    techText: 'text-orange-600',
    techRing: 'ring-orange-600/20',
  },
  amber: {
    chipBg: 'bg-amber-200/60',
    chipText: 'text-amber-600',
    chipRing: 'ring-amber-600/20',
    stroke: 'stroke-amber-600',
    divider: 'border-amber-600/20',
    techBg: 'bg-amber-200/60',
    techText: 'text-amber-600',
    techRing: 'ring-amber-600/20',
  },
  yellow: {
    chipBg: 'bg-yellow-200/60',
    chipText: 'text-yellow-600',
    chipRing: 'ring-yellow-600/20',
    stroke: 'stroke-yellow-600',
    divider: 'border-yellow-600/20',
    techBg: 'bg-yellow-200/60',
    techText: 'text-yellow-600',
    techRing: 'ring-yellow-600/20',
  },
  lime: {
    chipBg: 'bg-lime-200/60',
    chipText: 'text-lime-600',
    chipRing: 'ring-lime-600/20',
    stroke: 'stroke-lime-600',
    divider: 'border-lime-600/20',
    techBg: 'bg-lime-200/60',
    techText: 'text-lime-600',
    techRing: 'ring-lime-600/20',
  },
  emerald: {
    chipBg: 'bg-emerald-200/60',
    chipText: 'text-emerald-600',
    chipRing: 'ring-emerald-600/20',
    stroke: 'stroke-emerald-600',
    divider: 'border-emerald-600/20',
    techBg: 'bg-emerald-200/60',
    techText: 'text-emerald-600',
    techRing: 'ring-emerald-600/20',
  },
  teal: {
    chipBg: 'bg-teal-200/60',
    chipText: 'text-teal-600',
    chipRing: 'ring-teal-600/20',
    stroke: 'stroke-teal-600',
    divider: 'border-teal-600/20',
    techBg: 'bg-teal-200/60',
    techText: 'text-teal-600',
    techRing: 'ring-teal-600/20',
  },
  cyan: {
    chipBg: 'bg-cyan-200/60',
    chipText: 'text-cyan-600',
    chipRing: 'ring-cyan-600/20',
    stroke: 'stroke-cyan-600',
    divider: 'border-cyan-600/20',
    techBg: 'bg-cyan-200/60',
    techText: 'text-cyan-600',
    techRing: 'ring-cyan-600/20',
  },
  sky: {
    chipBg: 'bg-sky-200/60',
    chipText: 'text-sky-600',
    chipRing: 'ring-sky-600/20',
    stroke: 'stroke-sky-600',
    divider: 'border-sky-600/20',
    techBg: 'bg-sky-200/60',
    techText: 'text-sky-600',
    techRing: 'ring-sky-600/20',
  },
  indigo: {
    chipBg: 'bg-indigo-200/60',
    chipText: 'text-indigo-600',
    chipRing: 'ring-indigo-600/20',
    stroke: 'stroke-indigo-600',
    divider: 'border-indigo-600/20',
    techBg: 'bg-indigo-200/60',
    techText: 'text-indigo-600',
    techRing: 'ring-indigo-600/20',
  },
  violet: {
    chipBg: 'bg-violet-200/60',
    chipText: 'text-violet-600',
    chipRing: 'ring-violet-600/20',
    stroke: 'stroke-violet-600',
    divider: 'border-violet-600/20',
    techBg: 'bg-violet-200/60',
    techText: 'text-violet-600',
    techRing: 'ring-violet-600/20',
  },
  purple: {
    chipBg: 'bg-purple-200/60',
    chipText: 'text-purple-600',
    chipRing: 'ring-purple-600/20',
    stroke: 'stroke-purple-600',
    divider: 'border-purple-600/20',
    techBg: 'bg-purple-200/60',
    techText: 'text-purple-600',
    techRing: 'ring-purple-600/20',
  },
  fuchsia: {
    chipBg: 'bg-fuchsia-200/60',
    chipText: 'text-fuchsia-600',
    chipRing: 'ring-fuchsia-600/20',
    stroke: 'stroke-fuchsia-600',
    divider: 'border-fuchsia-600/20',
    techBg: 'bg-fuchsia-200/60',
    techText: 'text-fuchsia-600',
    techRing: 'ring-fuchsia-600/20',
  },
}

function paletteForTone(tone: TagTone): keyof typeof PALETTES {
  // Match accent hue to the BentoCard tone hue.
  switch (tone) {
    case 'purple':
      return 'violet'
    case 'pink':
      return 'fuchsia'
    case 'green':
      return 'emerald'
    case 'beige':
      return 'amber'
    case 'blue':
      return 'sky'
    case 'skills':
      return 'teal'
    case 'about':
      return 'indigo'
    case 'resume':
      return 'purple'
    default:
      return 'indigo'
  }
}

function projectTypeLabel(tags: readonly string[], icon: IconName): 'web' | 'mobile' | 'chrome' {
  const tagLower = tags.map((t) => t.toLowerCase())
  if (tagLower.includes('chrome')) return 'chrome'
  if (icon === 'mobile' || tagLower.includes('flutter')) return 'mobile'
  return 'web'
}

function TechChip({ children, palette }: { children: string; palette: Palette }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 backdrop-blur-md',
        palette.techBg,
        palette.techText,
        palette.techRing,
      )}
    >
      {children}
    </span>
  )
}

export function ProjectGridCard({
  tone,
  title,
  description,
  tags,
  icon: iconName,
}: {
  tone: TagTone
  title: string
  subtitle?: string
  description: string
  tags: readonly string[]
  icon: IconName
}) {
  const palette = PALETTES[paletteForTone(tone)]

  return (
    <BentoCard
      tone={tone}
      padding="md"
      className="h-full min-h-[240px] sm:min-h-[245px] lg:min-h-[255px] shadow-md shadow-slate-900/10"
    >
      <div className="flex h-full min-h-0 flex-col">
        {/* Top bar: logo (left) + type chip (right) */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={cx(
              'grid h-8 w-8 shrink-0 place-items-center rounded-md ring-1 backdrop-blur-md',
              palette.chipBg,
              palette.chipRing,
            )}
          >
            <Icon name={iconName} className="h-4 w-4" pathClassName={palette.stroke} />
          </span>
          <span
            className={cx(
              'inline-flex items-center rounded-full px-2 py-1 text-[11px] font-semibold ring-1 backdrop-blur-md',
              palette.chipBg,
              palette.chipText,
              palette.chipRing,
            )}
          >
            {projectTypeLabel(tags, iconName)}
          </span>
        </div>

        <div className="mt-1.5 text-sm font-semibold leading-snug tracking-tight text-slate-900">{title}</div>

        {/* Reserve 4 lines even when description is short (whitespace remains). */}
        <div className="mt-1 min-h-[66px]">
          <p className="clamp-4 text-xs leading-snug text-slate-600">{description}</p>
        </div>

        {/* Bottom content: tech chips + footer (footer stays at the bottom). */}
        <div className="mt-auto flex flex-col">
          {/* Tech chips: exactly 2 lines max */}
          <div className="max-h-11 overflow-hidden">
            <div className="flex flex-wrap gap-1">
              {tags.map((t) => (
                <TechChip key={t} palette={palette}>
                  {t}
                </TechChip>
              ))}
            </div>
          </div>

          {/* Divider + footer padding */}
          <div className={cx('mt-2 border-t pt-2', palette.divider)}>
            <div className="flex items-center justify-between">
              <button
                type="button"
                className={cx(
                  'cursor-pointer inline-flex items-center gap-2 rounded-md bg-transparent p-0 text-left text-xs font-semibold',
                  palette.chipText,
                  'hover:text-opacity-80',
                )}
              >
                <Icon name="github" className="h-3.5 w-3.5 shrink-0" pathClassName={palette.stroke} />
                CODE
              </button>

              <button
                type="button"
                className={cx(
                  'cursor-pointer inline-flex items-center gap-2 rounded-md bg-transparent p-0 text-right text-xs font-semibold',
                  palette.chipText,
                  'hover:text-opacity-80',
                )}
              >
                <span className="sr-only">Demo</span>
                DEMO
                <Icon name="external" className="h-3.5 w-3.5 shrink-0" pathClassName={palette.stroke} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  )
}
