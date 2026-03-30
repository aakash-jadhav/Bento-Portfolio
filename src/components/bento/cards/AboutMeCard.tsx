import { usePortfolioForCard } from '../../../contexts/AdminPreviewPortfolioContext'
import { BentoCard } from '../BentoCard'
import { Icon } from '../Icon'
import { cx } from '../utils'
import { downloadResumePdf } from '../../../resumeStorage'

type AboutMeCardProps = {
  className?: string
}

export function AboutMeCard({ className }: AboutMeCardProps) {
  const a = usePortfolioForCard().about

  return (
    <BentoCard
      tone="about"
      title="About Me"
      headerVariant="split"
      padding="comfortable"
      headerLabelClassName="text-xs tracking-[0.2em] text-[#6366F1]"
      icon={
        <Icon
          name="user"
          className="h-5 w-5"
          pathClassName="stroke-[#6366F1]"
        />
      }
      className={cx('min-h-0 border-indigo-300/25', className)}
    >
      <div className="text-xl font-bold leading-snug tracking-tight text-[#1F2937]">
        {a.name}
      </div>
      <div className="mt-1 text-xs font-medium leading-snug text-slate-950">
        {a.title}
      </div>

      <div className="mt-4 grid gap-2 text-xs leading-snug text-slate-950">
        <div className="grid grid-cols-2 items-start gap-x-3 gap-y-2">
          <span className="inline-flex min-w-0 items-start gap-2">
            <Icon
              name="mail"
              className="mt-0.5 h-3 w-3 shrink-0"
              pathClassName="stroke-slate-800"
            />
            <span className="min-w-0 wrap-anywhere">{a.email}</span>
          </span>
          <span className="inline-flex min-w-0 items-center gap-2 justify-self-start">
            <Icon
              name="phone"
              className="h-3 w-3 shrink-0"
              pathClassName="stroke-slate-800"
            />
            <span className="truncate">{a.phone}</span>
          </span>
        </div>
        <div className="grid grid-cols-2 items-start gap-x-3 gap-y-2">
          <span className="inline-flex min-w-0 items-start gap-2">
            <Icon
              name="pin"
              className="mt-0.5 h-3 w-3 shrink-0"
              pathClassName="stroke-slate-800"
            />
            <span className="min-w-0 wrap-break-word">{a.location}</span>
          </span>
          <button
            type="button"
            className="cursor-pointer inline-flex items-center gap-1.5 justify-self-start text-xs font-semibold text-[#6366F1] hover:text-[#4F46E5]"
            onClick={() => {
              downloadResumePdf().catch(() => {
                // If no resume exists, do nothing.
              })
            }}
          >
            <Icon
              name="download"
              className="h-3 w-3 shrink-0"
              pathClassName="stroke-[#6366F1]"
            />
            Download Resume
          </button>
        </div>
      </div>
    </BentoCard>
  )
}
