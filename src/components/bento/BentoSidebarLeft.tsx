import { AboutMeCard } from './cards/AboutMeCard'
import { ExperienceCard } from './cards/ExperienceCard'
import { FeaturedProjectCard } from './cards/FeaturedProjectCard'

export function BentoSidebarLeft({ onGoProjects }: { onGoProjects: () => void }) {
  return (
    <div className="grid h-full min-h-0 grid-rows-[1.12fr_0.8fr_1fr] gap-6">
      <AboutMeCard />
      <ExperienceCard />
      <FeaturedProjectCard variant="sidebar" onGoProjects={onGoProjects} />
    </div>
  )
}
