import { PROJECT_GRID_ITEMS } from '../components/bento/projectsData'
import type { PortfolioContent, ProjectEditorEntry, SiteContent } from './siteContentTypes'

export const DEFAULT_PORTFOLIO: PortfolioContent = {
  about: {
    name: 'Alex Rivers',
    title: 'Full Stack Developer',
    email: 'hello@arivers.dev',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  },
  summary: {
    headline: 'Driven Full Stack Architect',
    body:
      'Passionate about building scalable web applications and leading high-performance engineering teams. I specialize in bridging the gap between complex backend systems and intuitive, modern user experiences.',
  },
  experience: {
    years: '3+ Years',
    role: 'Full Stack Developer',
    footer: 'IN-INDUSTRY PROFESSIONAL',
  },
  education: {
    degree: 'B.S. Computer Science',
    school: 'Stanford University',
    meta: 'Class of 2018 • GPA 3.9',
  },
  skills: {
    groups: [
      {
        title: 'FRONT-END MASTERY',
        tags: ['React / Next.js 14', 'TypeScript', 'Tailwind', 'Framer Motion', 'Zustand'],
      },
      {
        title: 'BACK-END & INFRASTRUCTURE',
        tags: ['Node.js', 'NestJS', 'PostgreSQL', 'Prisma', 'AWS', 'Docker'],
      },
      {
        title: 'MOBILE & BROWSER',
        tags: ['Flutter', 'Chrome Extension Dev'],
      },
    ],
  },
  featuredEco: {
    headerLabel: 'Featured Project',
    title: 'Eco-Track Dashboard',
    description:
      'SaaS platform tracking carbon footprints. Built with Next.js and D3.js.',
    codeUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  featuredSecure: {
    headerLabel: 'Project 02',
    title: 'SecurePay API',
    description:
      'High-throughput payment gateway processing 10k+ req/sec. Node.js & Redis.',
    codeUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
}

function cloneProjects(): ProjectEditorEntry[] {
  return PROJECT_GRID_ITEMS.map((p) => ({
    tone: p.tone,
    subtitle: p.subtitle,
    title: p.title,
    description: p.description,
    tags: [...p.tags],
    icon: p.icon,
  }))
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  portfolio: DEFAULT_PORTFOLIO,
  projects: cloneProjects(),
}

export const SITE_CONTENT_STORAGE_KEY = 'bento_resume_site_content_v1'
