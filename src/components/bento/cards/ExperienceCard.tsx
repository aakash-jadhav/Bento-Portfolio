import { BentoCard } from '../BentoCard'
import { Icon } from '../Icon'
import { cx } from '../utils'

type ExperienceCardProps = {
  className?: string
}

export function ExperienceCard({ className }: ExperienceCardProps) {
  return (
    <BentoCard
      tone="pink"
      title="Experience"
      headerVariant="split"
      headerLabelClassName="text-xs tracking-[0.2em] text-rose-900"
      icon={
        <Icon
          name="briefcase"
          className="h-4 w-4"
          pathClassName="stroke-rose-900"
        />
      }
      className={cx('min-h-0 border-rose-200/40', className)}
    >
      <div className="flex min-h-0 h-full flex-1 flex-col">
        <div className="text-3xl font-semibold tracking-tight text-slate-900">3+ Years</div>
        <div className="mt-1 text-xs font-medium text-slate-800/70">Full Stack Developer</div>
        <div className="mt-auto text-[11px] font-semibold tracking-[0.16em] text-rose-900/90">
          IN-INDUSTRY PROFESSIONAL
        </div>
      </div>
    </BentoCard>
  )
}
