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
      <div className="mt-1 text-[11px] font-medium leading-snug text-[#4B5563]">
        {a.title}
      </div>

      <div className="mt-4 grid gap-2 text-[11px] leading-snug text-[#4B5563]">
        <div className="grid grid-cols-2 items-center gap-4">
          <span className="inline-flex min-w-0 items-center gap-2.5">
            <Icon
              name="mail"
              className="h-3.5 w-3.5 shrink-0"
              pathClassName="stroke-[#4B5563]"
            />
            <span className="truncate">{a.email}</span>
          </span>
          <span className="inline-flex min-w-0 items-center gap-2.5 justify-self-start">
            <Icon
              name="phone"
              className="h-3.5 w-3.5 shrink-0"
              pathClassName="stroke-[#4B5563]"
            />
            <span className="truncate">{a.phone}</span>
          </span>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <span className="inline-flex min-w-0 items-center gap-2.5">
            <Icon
              name="pin"
              className="h-3.5 w-3.5 shrink-0"
              pathClassName="stroke-[#4B5563]"
            />
            <span className="truncate">{a.location}</span>
          </span>
          <button
            type="button"
            className="cursor-pointer inline-flex items-center gap-1.5 justify-self-start font-semibold text-[#6366F1] hover:text-[#4F46E5]"
            onClick={() => {
              downloadResumePdf().catch(() => {
                // If no resume exists, do nothing.
              })
            }}
          >
            <Icon
              name="download"
              className="h-3.5 w-3.5 shrink-0"
              pathClassName="stroke-[#6366F1]"
            />
            Download Resume
          </button>
        </div>
      </div>
    </BentoCard>
  )
}
