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
        <div className="min-h-0">
          <div className="text-[11px] font-semibold tracking-[0.16em] text-violet-900/75">
            FRONT-END MASTERY
          </div>
          <div
            className={cx(
              'mt-1.5 flex flex-wrap gap-1.5',
              showExploringFooter && 'max-h-24 overflow-hidden',
            )}
          >
            <Tag appearance="skills" tone="skills">
              React / Next.js 14
            </Tag>
            <Tag appearance="skills" tone="skills">
              TypeScript
            </Tag>
            <Tag appearance="skills" tone="skills">
              Tailwind
            </Tag>
            <Tag appearance="skills" tone="skills">
              Framer Motion
            </Tag>
            <Tag appearance="skills" tone="skills">
              Zustand
            </Tag>
          </div>
        </div>
        <div className="min-h-0">
          <div className="text-[11px] font-semibold tracking-[0.16em] text-violet-900/75">
            BACK-END & INFRASTRUCTURE
          </div>
          <div
            className={cx(
              'mt-1.5 flex flex-wrap gap-1.5',
              showExploringFooter && 'max-h-24 overflow-hidden',
            )}
          >
            <Tag appearance="skills" tone="skills">
              Node.js
            </Tag>
            <Tag appearance="skills" tone="skills">
              NestJS
            </Tag>
            <Tag appearance="skills" tone="skills">
              PostgreSQL
            </Tag>
            <Tag appearance="skills" tone="skills">
              Prisma
            </Tag>
            <Tag appearance="skills" tone="skills">
              AWS
            </Tag>
            <Tag appearance="skills" tone="skills">
              Docker
            </Tag>
          </div>
        </div>
        <div className="min-h-0">
          <div className="text-[11px] font-semibold tracking-[0.16em] text-violet-900/75">
            MOBILE & BROWSER
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <Tag appearance="skills" tone="skills">
              Flutter
            </Tag>
            <Tag appearance="skills" tone="skills">
              Chrome Extension Dev
            </Tag>
          </div>
        </div>
        {showExploringFooter ? (
          <p className="mt-auto text-xs italic text-indigo-950/75">
            Exploring: Web3 &amp; AI Agents
          </p>
        ) : null}
      </div>
    </BentoCard>
  )
}
