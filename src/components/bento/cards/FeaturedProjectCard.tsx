import { usePortfolioForCard } from '../../../contexts/AdminPreviewPortfolioContext'
import { BentoCard } from '../BentoCard'
import { Icon } from '../Icon'
import { cx, PORTFOLIO_BODY_TEXT_CLASS } from '../utils'

type FeaturedProjectCardProps = {
  className?: string
  variant: 'home' | 'sidebar'
  onGoProjects: () => void
  project?: 'eco' | 'secure'
}

export function FeaturedProjectCard({
  className,
  variant,
  onGoProjects,
  project = 'eco',
}: FeaturedProjectCardProps) {
  const isSecure = project === 'secure'
  const p = usePortfolioForCard()
  const f = isSecure ? p.featuredSecure : p.featuredEco

  const linkIconStroke = isSecure ? 'stroke-amber-900' : 'stroke-orange-800'
  const linkText = isSecure
    ? 'text-amber-900 hover:text-amber-950'
    : 'text-orange-900 hover:text-orange-950'

  return (
    <BentoCard
      tone="beige"
      padding="sm"
      title={f.headerLabel}
      headerVariant="split"
      headerLabelClassName={cx(
        'text-xs tracking-[0.2em]',
        isSecure ? 'text-amber-950' : 'text-orange-950',
      )}
      icon={
        <span
          className={cx(
            'grid h-8 w-8 place-items-center rounded-full ring-1',
            isSecure ? 'bg-amber-100/60 ring-amber-200/45' : 'bg-orange-200/35 ring-orange-300/45',
          )}
        >
          <Icon name="spark" className="h-4 w-4" pathClassName={linkIconStroke} />
        </span>
      }
      className={cx(
        'h-full min-h-0',
        isSecure ? 'border-[#F2D57A]/55 bg-[#FFF7D9]' : 'border-orange-200/35',
        className,
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col" data-featured-layout={variant}>
        <div className="shrink-0 text-base font-semibold tracking-tight text-slate-900">
          {f.title}
        </div>
        {/* shrink-0 + reserved line height so flex-1 above never compresses the description */}
        <div className="mt-1.5 shrink-0">
          <p className={cx('clamp-2', PORTFOLIO_BODY_TEXT_CLASS)}>
            {f.description}
          </p>
        </div>

        <div className="min-h-0 flex-1" aria-hidden />

        <div className="mt-2 flex min-w-0 shrink-0 flex-wrap items-center justify-between gap-x-2 gap-y-1 border-t border-slate-900/6 pt-2 pb-1">
          <div
            className={cx(
              'flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] font-semibold uppercase tracking-wide',
              linkText,
            )}
          >
            <a
              href={f.codeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer inline-flex items-center gap-1.5"
            >
              <Icon name="github" className="h-3 w-3 shrink-0" pathClassName={linkIconStroke} />
              CODE
            </a>
            <a
              href={f.demoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer inline-flex items-center gap-1.5"
            >
              <Icon name="external" className="h-3 w-3 shrink-0" pathClassName={linkIconStroke} />
              <span className="sr-only">Visit</span>
              VISIT
            </a>
          </div>

          <button
            type="button"
            onClick={onGoProjects}
            className={cx(
              'cursor-pointer shrink-0 rounded-full px-1.5 py-px text-[7px] font-bold uppercase leading-none tracking-wide ring-1 transition',
              isSecure
                ? 'bg-amber-200/55 text-amber-950 ring-amber-400/35 hover:bg-amber-200/80'
                : 'bg-orange-200/50 text-orange-950 ring-orange-400/35 hover:bg-orange-200/75',
            )}
          >
            {'More\u00a0›'}
          </button>
        </div>
      </div>
    </BentoCard>
  )
}
