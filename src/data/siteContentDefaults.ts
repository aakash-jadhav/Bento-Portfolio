import type { IconName } from '../components/bento/Icon'
import { PROJECT_GRID_ITEMS } from '../components/bento/projectsData'
import type { TagTone } from '../components/bento/types'
import type { PortfolioContent, ProjectEditorEntry, SiteContent } from './siteContentTypes'

export const DEFAULT_PORTFOLIO: PortfolioContent = {
  about: {
    name: 'Aakash Jadhav',
    title: 'Full Stack Developer',
    email: 'aakash2jadhav@gmail.com',
    phone: '7769978774',
    location: 'Kolhapur, India',
  },
  summary: {
    headline: 'Driven Full Stack Developer',
    body:
      'Results-driven Full Stack Developer with 3+ years of experience building scalable web apps. Skilled in React, Next.js, Node.js, and modern backend systems. Strong in API design, state management, and AI-driven solutions to improve performance and user engagement.',
  },
  experience: {
    years: '3+ Years',
    role: 'Full Stack Developer',
    footer: 'IN-INDUSTRY PROFESSIONAL',
  },
  education: {
    degree: 'B.E. Computer Science',
    school: 'Shivaji University',
    meta: 'Class of 2019 • 72%',
  },
  skills: {
    groups: [
      {
        title: 'FRONT-END MASTERY',
        tags: ['React', 'TypeScript', 'Tailwind', 'Shadcn/UI', 'Redux', 'Zustand', 'React Query', 'Mantine UI', 'Material UI'],
      },
      {
        title: 'BACK-END & INFRASTRUCTURE',
        tags: ['Node.js', 'NestJS', 'PostgreSQL', 'Prisma', 'SQL','MongoDB'],
      },
      {
        title: 'MOBILE & BROWSER',
        tags: ['Flutter', 'Chrome Extension Dev'],
      },
    ],
  },
  featuredEco: {
    headerLabel: 'Featured Project',
    title: 'AI Interview Genius',
    description:
      'AI-powered interview preparation platform. Built with React, Node.js, and Tailwind.',
    codeUrl: 'https://github.com/aakash-jadhav/Interview-genius',
    demoUrl: 'https://interview-geniuses.netlify.app/',
  },
  featuredSecure: {
    headerLabel: 'Featured Project',
    title: 'AI Steps Generator',
    description:
      'AI-powered step-by-step guide generator for tasks and projects. Built with React, Node.js.',
    codeUrl: 'https://github.com/aakash-jadhav/AI-Steps',
    demoUrl: 'https://stepai.netlify.app/',
  },
}

/** Migrate stored JSON (e.g. removed `subtitle`, added links). */
export function normalizeProjectEditorEntry(row: unknown): ProjectEditorEntry {
  const r = row as Partial<ProjectEditorEntry> & { subtitle?: string }
  return {
    tone: (r.tone as TagTone) ?? 'purple',
    title: typeof r.title === 'string' ? r.title : '',
    description: typeof r.description === 'string' ? r.description : '',
    tags: Array.isArray(r.tags) ? r.tags.map((t) => String(t)) : [],
    icon: (r.icon as IconName) ?? 'code',
    codeUrl: typeof r.codeUrl === 'string' ? r.codeUrl : '',
    demoUrl: typeof r.demoUrl === 'string' ? r.demoUrl : '',
  }
}

export function normalizeSiteContent(content: SiteContent): SiteContent {
  return {
    ...content,
    projects: content.projects.map(normalizeProjectEditorEntry),
  }
}

function cloneProjects(): ProjectEditorEntry[] {
  return PROJECT_GRID_ITEMS.map((p) => ({
    tone: p.tone,
    title: p.title,
    description: p.description,
    tags: [...p.tags],
    icon: p.icon,
    codeUrl: p.codeUrl,
    demoUrl: p.demoUrl,
  }))
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  portfolio: DEFAULT_PORTFOLIO,
  projects: cloneProjects(),
}

export const SITE_CONTENT_STORAGE_KEY = 'bento_resume_site_content_v1'
