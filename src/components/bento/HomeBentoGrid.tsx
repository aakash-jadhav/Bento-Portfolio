import { AboutMeCard } from './cards/AboutMeCard'
import { EducationCard } from './cards/EducationCard'
import { ExperienceCard } from './cards/ExperienceCard'
import { FeaturedProjectCard } from './cards/FeaturedProjectCard'
import { SkillsExpertiseCard } from './cards/SkillsExpertiseCard'
import { SummaryObjectiveCard } from './cards/SummaryObjectiveCard'
import { cx } from './utils'

export function HomeBentoGrid({ onGoProjects }: { onGoProjects: () => void }) {
  return (
    <div
      className={cx(
        'grid h-full min-h-0 gap-3 lg:gap-4',
        'grid-cols-1 lg:grid-cols-3 lg:grid-rows-3',
      )}
    >
      <AboutMeCard className="lg:col-start-1 lg:row-start-1" />

      <SummaryObjectiveCard className="lg:col-span-2 lg:col-start-2 lg:row-start-1" />

      <ExperienceCard className="lg:col-start-1 lg:row-start-2" />

      <EducationCard className="lg:col-start-2 lg:row-start-2" />

      <SkillsExpertiseCard
        showExploringFooter
        className="lg:col-start-3 lg:row-start-2 lg:row-span-2"
      />

      <FeaturedProjectCard
        variant="home"
        project="eco"
        onGoProjects={onGoProjects}
        className="lg:col-start-1 lg:row-start-3"
      />

      <FeaturedProjectCard
        variant="home"
        project="secure"
        onGoProjects={onGoProjects}
        className="lg:col-start-2 lg:row-start-3"
      />
    </div>
  )
}
