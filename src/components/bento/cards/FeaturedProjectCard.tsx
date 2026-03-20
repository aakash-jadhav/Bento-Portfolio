import { BentoCard } from '../BentoCard'
import { Icon } from '../Icon'
import { cx } from '../utils'

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

  const linkIconStroke = isSecure ? 'stroke-amber-900' : 'stroke-orange-800'
  const linkText = isSecure ? 'text-amber-900 hover:text-amber-950' : 'text-orange-900 hover:text-orange-950'

  const title = project === 'eco' ? 'Eco-Track Dashboard' : 'SecurePay API'
  const description =
    project === 'eco'
      ? 'SaaS platform tracking carbon footprints. Built with Next.js and D3.js.'
      : 'High-throughput payment gateway processing 10k+ req/sec. Node.js & Redis.'
  const headerLabel = project === 'eco' ? 'Featured Project' : 'Project 02'

  return (
    <BentoCard
      tone="beige"
      title={headerLabel}
      headerVariant="split"
      headerLabelClassName={cx(
        'text-xs tracking-[0.2em]',
        isSecure ? 'text-amber-950' : 'text-orange-950',
      )}
      icon={
        <span
          className={cx(
            'grid h-8 w-8 place-items-center rounded-md ring-1',
            isSecure ? 'bg-amber-100/60 ring-amber-200/45' : 'bg-orange-200/35 ring-orange-300/45',
          )}
        >
          <Icon name="spark" className="h-4 w-4" pathClassName={linkIconStroke} />
        </span>
      }
      className={cx(
        'min-h-0',
        isSecure ? 'border-[#F2D57A]/55 bg-[#FFF7D9]' : 'border-orange-200/35',
        className,
      )}
    >
      <div className={cx(variant === 'home' && 'flex min-h-0 flex-1 flex-col')}>
        <div className="text-base font-semibold tracking-tight text-slate-900">
          {title}
        </div>
        <div className="clamp-2 mt-1 text-xs text-slate-700/70">
          {description}
        </div>

        <div
          className={cx(
            'flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1.5',
            variant === 'home' ? 'mt-auto pt-3' : 'mt-3',
          )}
        >
          <div
            className={cx(
              'flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold uppercase tracking-wide',
              linkText,
            )}
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer inline-flex items-center gap-1.5"
            >
              <Icon name="github" className="h-3.5 w-3.5 shrink-0" pathClassName={linkIconStroke} />
              CODE
            </a>
            <a
              href="https://example.com"
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer inline-flex items-center gap-1.5"
            >
              <Icon name="external" className="h-3.5 w-3.5 shrink-0" pathClassName={linkIconStroke} />
              DEMO
            </a>
          </div>

          <button
            type="button"
            onClick={onGoProjects}
            className={cx(
              'cursor-pointer shrink-0 text-left text-[11px] font-bold uppercase tracking-wide',
              linkText,
            )}
          >
            VIEW MORE PROJECTS &gt;
          </button>
        </div>
      </div>
    </BentoCard>
  )
}
