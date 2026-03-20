import type { IconName } from './Icon'
import type { TagTone } from './types'

export type ProjectEntry = {
  tone: TagTone
  subtitle: string
  title: string
  description: string
  tags: readonly string[]
  icon: IconName
}

/** Nine portfolio projects for the 3×3 grid */
export const PROJECT_GRID_ITEMS: readonly ProjectEntry[] = [
  {
    tone: 'purple',
    subtitle: 'Project Alpha',
    title: 'Hyper-Comm Platform',
    description:
      'Distributed messaging with real-time sync across regions. Kafka and custom WebSockets for low latency.',
    tags: ['Node.js', 'Express', 'Kafka', 'WebSockets', 'Lambda', 'DynamoDB'],
    icon: 'server',
  },
  {
    tone: 'pink',
    subtitle: 'Project Beta',
    title: 'Analytica Pro',
    description:
      'Reporting engine for KPIs with interactive dashboards and deep-dive visualization panels.',
    tags: ['React', 'D3.js', 'Prisma', 'PostgreSQL', 'Tailwind', 'Docker'],
    icon: 'code',
  },
  {
    tone: 'green',
    subtitle: 'Project Gamma',
    title: 'Mobiliti App',
    description:
      'Fleet tracking and route optimization with a mobile-first UX and predictive scheduling.',
    tags: ['Flutter', 'Node.js', 'S3', 'RDS', 'CI/CD'],
    icon: 'mobile',
  },
  {
    tone: 'purple',
    subtitle: 'Project Delta',
    title: 'SecurePay API',
    description:
      'High-throughput payments with fraud detection and Stripe integration at scale.',
    tags: ['Node.js', 'Redis', 'NestJS', 'PostgreSQL', 'AWS'],
    icon: 'folder',
  },
  {
    tone: 'blue',
    subtitle: 'Project Epsilon',
    title: 'Aero-Logistics Suite',
    description:
      'Operations dashboard for air freight: shipment tracking, customs workflow, and alerts.',
    tags: ['Next.js', 'tRPC', 'PostgreSQL', 'Mapbox', 'BullMQ'],
    icon: 'server',
  },
  {
    tone: 'beige',
    subtitle: 'Project Zeta',
    title: 'Eco-Track Dashboard',
    description:
      'SaaS for carbon footprint tracking with role-based reports and compliance exports.',
    tags: ['Next.js 14', 'D3.js', 'PostgreSQL', 'Tailwind'],
    icon: 'spark',
  },
  {
    tone: 'pink',
    subtitle: 'Project Eta',
    title: 'ClipNotes AI',
    description:
      'Browser extension that summarizes articles and captures notes with vector search.',
    tags: ['React', 'Chrome', 'OpenAI', 'Pinecone', 'Vite'],
    icon: 'code',
  },
  {
    tone: 'green',
    subtitle: 'Project Theta',
    title: 'Pulse Health Sync',
    description:
      'HL7/FHIR ingestion pipeline with scheduling, anomaly alerts, and audit trails.',
    tags: ['NestJS', 'Redis', 'PostgreSQL', 'Docker', 'AWS'],
    icon: 'server',
  },
  {
    tone: 'blue',
    subtitle: 'Project Iota',
    title: 'Lensroom Studio',
    description:
      'Collaborative design critique tool with canvas, comments, and version history.',
    tags: ['React', 'Canvas API', 'Yjs', 'WebRTC', 'S3'],
    icon: 'mobile',
  },
] as const
