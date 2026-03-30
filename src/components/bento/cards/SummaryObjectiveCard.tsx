import { usePortfolioForCard } from '../../../contexts/AdminPreviewPortfolioContext'
import { BentoCard } from '../BentoCard'
import { Icon } from '../Icon'
import { cx, PORTFOLIO_BODY_TEXT_CLASS } from '../utils'

type SummaryObjectiveCardProps = {
  className?: string
}

export function SummaryObjectiveCard({ className }: SummaryObjectiveCardProps) {
  const s = usePortfolioForCard().summary

  return (
    <BentoCard
      tone="green"
      title="Summary & Objective"
      headerVariant="split"
      padding="comfortable"
      headerLabelClassName="text-xs tracking-[0.2em] text-emerald-900"
      icon={
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-100/90 ring-1 ring-emerald-300/60">
          <Icon
            name="target"
            className="h-3.5 w-3.5 text-emerald-900"
            pathClassName="stroke-emerald-900"
          />
        </span>
      }
      className={cx('min-h-0 border-emerald-200/45', className)}
    >
      <div className="text-lg font-bold leading-snug tracking-tight text-[#1F2937]">
        {s.headline}
      </div>
      <p className={cx('clamp-4 mt-2.5 font-normal', PORTFOLIO_BODY_TEXT_CLASS)}>
        {s.body}
      </p>
    </BentoCard>
  )
}
