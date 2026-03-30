import { BentoCard } from '../BentoCard'
import { Icon } from '../Icon'
import type { TagTone } from '../types'
import { cx, PORTFOLIO_BODY_TEXT_CLASS } from '../utils'

type ResumeCardProps = {
  className?: string
  variant: 'home' | 'sidebar'
}

export function ResumeCard({ className, variant }: ResumeCardProps) {
  const tone: TagTone = variant === 'home' ? 'resume' : 'purple'
  const headerIcon =
    variant === 'home' ? (
      <Icon
        name="document"
        className="h-5 w-5"
        pathClassName="stroke-violet-950"
      />
    ) : (
      <Icon
        name="download"
        className="h-5 w-5"
        pathClassName="stroke-violet-950"
      />
    )
  const buttonClass =
    variant === 'home'
      ? 'mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-violet-900/15 hover:bg-violet-700'
      : 'mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-slate-900/10 hover:bg-slate-900/95'

  return (
    <BentoCard
      tone={tone}
      title="Resume"
      headerVariant="split"
      headerLabelClassName="text-xs tracking-[0.2em] text-violet-950"
      icon={headerIcon}
      className={cx('min-h-0 border-violet-200/35', className)}
    >
      <div className="text-lg font-semibold tracking-tight text-slate-900">
        Full Portfolio &amp; CV
      </div>
      <div className={cx('clamp-2 mt-1', PORTFOLIO_BODY_TEXT_CLASS)}>
        Available for offline reading in PDF format.
      </div>
      <button type="button" className={buttonClass}>
        <Icon name="download" className="h-5 w-5 stroke-white/90" />
        Download Resume
      </button>
    </BentoCard>
  )
}
