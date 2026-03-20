import { ResumeCard } from './cards/ResumeCard'
import { SkillsExpertiseCard } from './cards/SkillsExpertiseCard'

export function BentoSidebarRight() {
  return (
    <div className="grid h-full min-h-0 grid-rows-[1.6fr_0.84fr] gap-6">
      <SkillsExpertiseCard />
      <ResumeCard variant="sidebar" />
    </div>
  )
}
