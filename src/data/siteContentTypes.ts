import type { IconName } from '../components/bento/Icon'
import type { TagTone } from '../components/bento/types'

export type PortfolioSectionId =
  | 'about'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'featuredEco'
  | 'featuredSecure'

export type AboutContent = {
  name: string
  title: string
  email: string
  phone: string
  location: string
}

export type SummaryContent = {
  headline: string
  body: string
}

export type ExperienceContent = {
  years: string
  role: string
  footer: string
}

export type EducationContent = {
  degree: string
  school: string
  meta: string
}

export type SkillGroup = {
  title: string
  tags: string[]
}

export type SkillsContent = {
  groups: SkillGroup[]
}

export type FeaturedContent = {
  headerLabel: string
  title: string
  description: string
  codeUrl: string
  demoUrl: string
}

export type PortfolioContent = {
  about: AboutContent
  summary: SummaryContent
  experience: ExperienceContent
  education: EducationContent
  skills: SkillsContent
  featuredEco: FeaturedContent
  featuredSecure: FeaturedContent
}

export type ProjectEditorEntry = {
  tone: TagTone
  subtitle: string
  title: string
  description: string
  tags: string[]
  icon: IconName
}

export type SiteContent = {
  portfolio: PortfolioContent
  projects: ProjectEditorEntry[]
}
