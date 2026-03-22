import { usePortfolioForCard } from '../../../contexts/AdminPreviewPortfolioContext'
import { BentoCard } from '../BentoCard'
import { Icon } from '../Icon'
import { cx } from '../utils'

type EducationCardProps = {
  className?: string
}

export function EducationCard({ className }: EducationCardProps) {
  const e = usePortfolioForCard().education

  return (
    <BentoCard
      tone="blue"
      title="Education"
      headerVariant="split"
      headerLabelClassName="text-xs tracking-[0.2em] text-blue-950"
      icon={
        <Icon name="cap" className="h-4 w-4" pathClassName="stroke-blue-950" />
      }
      className={cx('min-h-0 border-blue-200/45', className)}
    >
      <div className="flex min-h-0 h-full flex-1 flex-col text-left">
        <div className="text-base font-semibold tracking-tight text-slate-900">
          {e.degree}
        </div>
        <div className="mt-1 text-xs text-slate-700/70">{e.school}</div>
        <div className="mt-auto text-xs italic text-slate-700/55">{e.meta}</div>
      </div>
    </BentoCard>
  )
}
