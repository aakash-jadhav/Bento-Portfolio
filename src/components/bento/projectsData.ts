import type { IconName } from './Icon'
import type { TagTone } from './types'

export type ProjectEntry = {
  tone: TagTone
  title: string
  description: string
  tags: readonly string[]
  icon: IconName
  codeUrl: string
  demoUrl: string
}

/** Nine portfolio projects for the 3×3 grid */
export const PROJECT_GRID_ITEMS: readonly ProjectEntry[] = [
  {
    tone: 'purple',
    title: 'Hyper-Comm Platform',
    description:
      'Distributed messaging with real-time sync across regions. Kafka and custom WebSockets for low latency.',
    tags: ['Node.js', 'Express', 'Kafka', 'WebSockets', 'Lambda', 'DynamoDB'],
    icon: 'server',
    codeUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    tone: 'pink',
    title: 'Analytica Pro',
    description:
      'Reporting engine for KPIs with interactive dashboards and deep-dive visualization panels.',
    tags: ['React', 'D3.js', 'Prisma', 'PostgreSQL', 'Tailwind', 'Docker'],
    icon: 'code',
    codeUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    tone: 'green',
    title: 'Mobiliti App',
    description:
      'Fleet tracking and route optimization with a mobile-first UX and predictive scheduling.',
    tags: ['Flutter', 'Node.js', 'S3', 'RDS', 'CI/CD'],
    icon: 'mobile',
    codeUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    tone: 'purple',
    title: 'SecurePay API',
    description:
      'High-throughput payments with fraud detection and Stripe integration at scale.',
    tags: ['Node.js', 'Redis', 'NestJS', 'PostgreSQL', 'AWS'],
    icon: 'folder',
    codeUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    tone: 'blue',
    title: 'Aero-Logistics Suite',
    description:
      'Operations dashboard for air freight: shipment tracking, customs workflow, and alerts.',
    tags: ['Next.js', 'tRPC', 'PostgreSQL', 'Mapbox', 'BullMQ'],
    icon: 'server',
    codeUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    tone: 'beige',
    title: 'Eco-Track Dashboard',
    description:
      'SaaS for carbon footprint tracking with role-based reports and compliance exports.',
    tags: ['Next.js 14', 'D3.js', 'PostgreSQL', 'Tailwind'],
    icon: 'spark',
    codeUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    tone: 'pink',
    title: 'ClipNotes AI',
    description:
      'Browser extension that summarizes articles and captures notes with vector search.',
    tags: ['React', 'Chrome', 'OpenAI', 'Pinecone', 'Vite'],
    icon: 'code',
    codeUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    tone: 'green',
    title: 'Pulse Health Sync',
    description:
      'HL7/FHIR ingestion pipeline with scheduling, anomaly alerts, and audit trails.',
    tags: ['NestJS', 'Redis', 'PostgreSQL', 'Docker', 'AWS'],
    icon: 'server',
    codeUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    tone: 'blue',
    title: 'Lensroom Studio',
    description:
      'Collaborative design critique tool with canvas, comments, and version history.',
    tags: ['React', 'Canvas API', 'Yjs', 'WebRTC', 'S3'],
    icon: 'mobile',
    codeUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
] as const
