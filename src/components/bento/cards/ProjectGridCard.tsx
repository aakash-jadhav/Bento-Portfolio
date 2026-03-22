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
  cardBg: string
  cardDivider: string
  techBg: string
  techText: string
  techRing: string
}

const PALETTES: Record<
  'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'indigo' | 'violet' | 'purple' | 'fuchsia',
  Palette
> = {
  red: {
    chipBg: 'bg-red-100/60',
    chipText: 'text-red-600',
    chipRing: 'ring-red-600/20',
    stroke: 'stroke-red-600',
    divider: 'border-red-600/20',
    cardBg: '!bg-red-100/60',
    cardDivider: '!border-red-600/20',
    techBg: 'bg-red-100/60',
    techText: 'text-red-600',
    techRing: 'ring-red-600/20',
  },
  orange: {
    chipBg: 'bg-orange-100/60',
    chipText: 'text-orange-600',
    chipRing: 'ring-orange-600/20',
    stroke: 'stroke-orange-600',
    divider: 'border-orange-600/20',
    cardBg: '!bg-orange-100/60',
    cardDivider: '!border-orange-600/20',
    techBg: 'bg-orange-100/60',
    techText: 'text-orange-600',
    techRing: 'ring-orange-600/20',
  },
  amber: {
    chipBg: 'bg-amber-100/60',
    chipText: 'text-amber-600',
    chipRing: 'ring-amber-600/20',
    stroke: 'stroke-amber-600',
    divider: 'border-amber-600/20',
    cardBg: '!bg-amber-100/60',
    cardDivider: '!border-amber-600/20',
    techBg: 'bg-amber-100/60',
    techText: 'text-amber-600',
    techRing: 'ring-amber-600/20',
  },
  yellow: {
    chipBg: 'bg-yellow-100/60',
    chipText: 'text-yellow-600',
    chipRing: 'ring-yellow-600/20',
    stroke: 'stroke-yellow-600',
    divider: 'border-yellow-600/20',
    cardBg: '!bg-yellow-100/60',
    cardDivider: '!border-yellow-600/20',
    techBg: 'bg-yellow-100/60',
    techText: 'text-yellow-600',
    techRing: 'ring-yellow-600/20',
  },
  lime: {
    chipBg: 'bg-lime-100/60',
    chipText: 'text-lime-600',
    chipRing: 'ring-lime-600/20',
    stroke: 'stroke-lime-600',
    divider: 'border-lime-600/20',
    cardBg: '!bg-lime-100/60',
    cardDivider: '!border-lime-600/20',
    techBg: 'bg-lime-100/60',
    techText: 'text-lime-600',
    techRing: 'ring-lime-600/20',
  },
  emerald: {
    chipBg: 'bg-emerald-100/60',
    chipText: 'text-emerald-600',
    chipRing: 'ring-emerald-600/20',
    stroke: 'stroke-emerald-600',
    divider: 'border-emerald-600/20',
    cardBg: '!bg-emerald-100/60',
    cardDivider: '!border-emerald-600/20',
    techBg: 'bg-emerald-100/60',
    techText: 'text-emerald-600',
    techRing: 'ring-emerald-600/20',
  },
  teal: {
    chipBg: 'bg-teal-100/60',
    chipText: 'text-teal-600',
    chipRing: 'ring-teal-600/20',
    stroke: 'stroke-teal-600',
    divider: 'border-teal-600/20',
    cardBg: '!bg-teal-100/60',
    cardDivider: '!border-teal-600/20',
    techBg: 'bg-teal-100/60',
    techText: 'text-teal-600',
    techRing: 'ring-teal-600/20',
  },
  cyan: {
    chipBg: 'bg-cyan-100/60',
    chipText: 'text-cyan-600',
    chipRing: 'ring-cyan-600/20',
    stroke: 'stroke-cyan-600',
    divider: 'border-cyan-600/20',
    cardBg: '!bg-cyan-100/60',
    cardDivider: '!border-cyan-600/20',
    techBg: 'bg-cyan-100/60',
    techText: 'text-cyan-600',
    techRing: 'ring-cyan-600/20',
  },
  sky: {
    chipBg: 'bg-sky-100/60',
    chipText: 'text-sky-600',
    chipRing: 'ring-sky-600/20',
    stroke: 'stroke-sky-600',
    divider: 'border-sky-600/20',
    cardBg: '!bg-sky-100/60',
    cardDivider: '!border-sky-600/20',
    techBg: 'bg-sky-100/60',
    techText: 'text-sky-600',
    techRing: 'ring-sky-600/20',
  },
  indigo: {
    chipBg: 'bg-indigo-100/60',
    chipText: 'text-indigo-600',
    chipRing: 'ring-indigo-600/20',
    stroke: 'stroke-indigo-600',
    divider: 'border-indigo-600/20',
    cardBg: '!bg-indigo-100/60',
    cardDivider: '!border-indigo-600/20',
    techBg: 'bg-indigo-100/60',
    techText: 'text-indigo-600',
    techRing: 'ring-indigo-600/20',
  },
  violet: {
    chipBg: 'bg-violet-100/60',
    chipText: 'text-violet-600',
    chipRing: 'ring-violet-600/20',
    stroke: 'stroke-violet-600',
    divider: 'border-violet-600/20',
    cardBg: '!bg-violet-100/60',
    cardDivider: '!border-violet-600/20',
    techBg: 'bg-violet-100/60',
    techText: 'text-violet-600',
    techRing: 'ring-violet-600/20',
  },
  purple: {
    chipBg: 'bg-purple-100/60',
    chipText: 'text-purple-600',
    chipRing: 'ring-purple-600/20',
    stroke: 'stroke-purple-600',
    divider: 'border-purple-600/20',
    cardBg: '!bg-purple-100/60',
    cardDivider: '!border-purple-600/20',
    techBg: 'bg-purple-100/60',
    techText: 'text-purple-600',
    techRing: 'ring-purple-600/20',
  },
  fuchsia: {
    chipBg: 'bg-fuchsia-100/60',
    chipText: 'text-fuchsia-600',
    chipRing: 'ring-fuchsia-600/20',
    stroke: 'stroke-fuchsia-600',
    divider: 'border-fuchsia-600/20',
    cardBg: '!bg-fuchsia-100/60',
    cardDivider: '!border-fuchsia-600/20',
    techBg: 'bg-fuchsia-100/60',
    techText: 'text-fuchsia-600',
    techRing: 'ring-fuchsia-600/20',
  },
}

const PALETTE_KEYS = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
] as const

/** Same hue as `palette.cardBg` for ProjectGridCard at this index (for admin sidebar active state). */
const SIDEBAR_ACTIVE_BG: Record<(typeof PALETTE_KEYS)[number], string> = {
  red: 'bg-red-100/60',
  orange: 'bg-orange-100/60',
  amber: 'bg-amber-100/60',
  yellow: 'bg-yellow-100/60',
  lime: 'bg-lime-100/60',
  emerald: 'bg-emerald-100/60',
  teal: 'bg-teal-100/60',
  cyan: 'bg-cyan-100/60',
  sky: 'bg-sky-100/60',
  indigo: 'bg-indigo-100/60',
  violet: 'bg-violet-100/60',
  purple: 'bg-purple-100/60',
  fuchsia: 'bg-fuchsia-100/60',
}

/** Aligns with preview card color for `paletteIndex` (rotation matches ProjectGridCard). */
export function getProjectSidebarActiveBgClass(paletteIndex: number): string {
  const k = PALETTE_KEYS[paletteIndex % PALETTE_KEYS.length]
  return SIDEBAR_ACTIVE_BG[k]
}

function projectTypeLabel(tags: readonly string[], icon: IconName): 'web' | 'mobile' | 'chrome' {
  const tagLower = tags.map((t) => t.toLowerCase())
  if (tagLower.includes('chrome')) return 'chrome'
  if (icon === 'mobile' || tagLower.includes('flutter')) return 'mobile'
  return 'web'
}

function TechChip({
  value,
  palette,
  onCopy,
}: {
  value: string
  palette: Palette
  onCopy: (value: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onCopy(value)}
      className={cx(
        'cursor-pointer inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 backdrop-blur-md',
        palette.techBg,
        palette.techText,
        palette.techRing,
      )}
      aria-label={`Copy ${value}`}
    >
      {value}
    </button>
  )
}

export function ProjectGridCard({
  tone,
  title,
  description,
  tags,
  icon: iconName,
  paletteIndex,
  onCopy,
}: {
  tone: TagTone
  title: string
  subtitle?: string
  description: string
  tags: readonly string[]
  icon: IconName
  paletteIndex: number
  onCopy: (value: string) => void
}) {
  const paletteKey = PALETTE_KEYS[paletteIndex % PALETTE_KEYS.length]
  const palette = PALETTES[paletteKey]

  return (
    <BentoCard
      tone={tone}
      padding="md"
      className={cx(
        'h-full min-h-[240px] sm:min-h-[245px] lg:min-h-[255px] shadow-md shadow-slate-900/10',
        palette.cardBg,
        palette.cardDivider,
      )}
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
          <button
            type="button"
            onClick={() => onCopy(projectTypeLabel(tags, iconName))}
            className={cx(
              'cursor-pointer inline-flex items-center rounded-full px-2 py-1 text-[11px] font-semibold ring-1 backdrop-blur-md',
              palette.chipBg,
              palette.chipText,
              palette.chipRing,
            )}
            aria-label={`Copy ${projectTypeLabel(tags, iconName)}`}
          >
            {projectTypeLabel(tags, iconName)}
          </button>
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
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <TechChip key={t} value={t} palette={palette} onCopy={onCopy} />
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
