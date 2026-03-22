import { usePortfolioForCard } from '../../../contexts/AdminPreviewPortfolioContext'
import { BentoCard } from '../BentoCard'
import { Icon } from '../Icon'
import { Tag } from '../Tag'
import { cx } from '../utils'

type SkillsExpertiseCardProps = {
  className?: string
  /** Home grid shows “Exploring…” footer and tighter tag clipping */
  showExploringFooter?: boolean
}

export function SkillsExpertiseCard({
  className,
  showExploringFooter = false,
}: SkillsExpertiseCardProps) {
  const { groups } = usePortfolioForCard().skills

  return (
    <BentoCard
      tone="skills"
      title="Skills & Expertise"
      headerVariant="split"
      headerLabelClassName="text-xs tracking-[0.2em] text-indigo-950"
      icon={
        <Icon
          name="bolt"
          className="h-4 w-4"
          pathClassName="stroke-indigo-950"
        />
      }
      className={cx('min-h-0 border-indigo-200/35', className)}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
        {groups.map((g) => (
          <div key={g.title} className="min-h-0">
            <div className="text-[11px] font-semibold tracking-[0.16em] text-violet-900/75">
              {g.title}
            </div>
            <div
              className={cx(
                'mt-1.5 flex flex-wrap gap-1.5',
                showExploringFooter && 'max-h-24 overflow-hidden',
              )}
            >
              {g.tags.map((t) => (
                <Tag key={t} appearance="skills" tone="skills">
                  {t}
                </Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  )
}
