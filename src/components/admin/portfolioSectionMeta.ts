import type { LucideIcon } from 'lucide-react'
import {
  Briefcase,
  FileText,
  GraduationCap,
  Star,
  User,
  Zap,
} from 'lucide-react'
import type { PortfolioSectionId } from '../../data/siteContentTypes'

export type PortfolioSectionMeta = {
  id: PortfolioSectionId
  label: string
  /** Subtitle under "Sections" */
  hint: string
  /** Pastel pill background when active (matches bento card tone) */
  activeBgClass: string
  Icon: LucideIcon
}

export const PORTFOLIO_SECTIONS: readonly PortfolioSectionMeta[] = [
  {
    id: 'about',
    label: 'About Me',
    hint: 'Profile & contact',
    activeBgClass: 'bg-[#E8EDFF]',
    Icon: User,
  },
  {
    id: 'summary',
    label: 'Summary',
    hint: 'Headline & bio',
    activeBgClass: 'bg-[#E0FDF0]',
    Icon: FileText,
  },
  {
    id: 'experience',
    label: 'Experience',
    hint: 'Years & role',
    activeBgClass: 'bg-[#FDF1F5]',
    Icon: Briefcase,
  },
  {
    id: 'education',
    label: 'Education',
    hint: 'Degree & school',
    activeBgClass: 'bg-[#E0F2FE]',
    Icon: GraduationCap,
  },
  {
    id: 'skills',
    label: 'Skills',
    hint: 'Skill groups & tags',
    activeBgClass: 'bg-[#E8EAF6]',
    Icon: Zap,
  },
  {
    id: 'featuredEco',
    label: 'Eco-Track',
    hint: 'Featured project (home)',
    activeBgClass: 'bg-[#F8EBE0]',
    Icon: Star,
  },
  {
    id: 'featuredSecure',
    label: 'SecurePay',
    hint: 'Featured project (home)',
    activeBgClass: 'bg-[#FFF7D9]',
    Icon: Star,
  },
] as const
