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
    title: 'Weekly Time Table',
    description:
      `Built a full-stack weekly timetable app with drag-and-drop scheduling and per-user key access.
Features optimistic UI updates, task/timeslot management, and persistent cloud storage with Neon Postgres.`,
    tags: ['React', 'Vite', 'Mantine', 'Express', 'PostgreSQL'],
    icon: 'server',
    codeUrl: 'https://github.com/aakash-jadhav/TimeTable_Frontend',
    demoUrl: 'https://time-table-weekly.netlify.app/',
  },
  {
    tone: 'pink',
    title: 'Notalyy',
    description:
      'A modern, responsive notes web application built with React, Vite, and Tailwind CSS.',
    tags: ['React', 'Vite', 'Tailwind CSS ', 'React Hook Form', 'Lucide React'],
    icon: 'code',
    codeUrl: 'https://github.com/aakash-jadhav/Notes',
    demoUrl: 'https://notalyy.netlify.app/',
  },
  {
    tone: 'green',
    title: 'Retro Film',
    description:
      'Web app that turns your photos into a classic black-and-white look with a cinematic vignette.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Canvas API '],
    icon: 'mobile',
    codeUrl: 'https://github.com/aakash-jadhav/RetroFilm',
    demoUrl: 'https://retro-film.netlify.app/',
  },
  {
    tone: 'purple',
    title: 'EJS Live Template Editor',
    description:
      'In-browser playground to write EJS templates and bind them to JSON data. Includes manual refresh, print for the preview, and a split layout (editors + preview) styled with Tailwind.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'EJS'],
    icon: 'folder',
    codeUrl: 'https://github.com/aakash-jadhav/Ejs',
    demoUrl: 'https://example.com',
  },
  {
    tone: 'blue',
    title: 'Network Inspector',
    description:
      'Inspect console logs and network requests in a toolbar popup instead of opening DevTools. Built with vanilla JS: page-world hooks, a service worker, and per-tab storage with export and privacy-minded header redaction.',
    tags: ['Next.js', 'tRPC', 'PostgreSQL', 'Mapbox', 'BullMQ'],
    icon: 'server',
    codeUrl: 'https://github.com/aakash-jadhav/DevPeak',
    demoUrl: 'https://github.com/aakash-jadhav/DevPeak',
  },
  {
    tone: 'beige',
    title: 'Expense Tracker',
    description:
      'Track budgets and expenses in one dashboard with toasts for every action. Built as a client-side React app with data persisted in localStorage and deployed on Netlify.',
    tags: ['React', 'Vite', 'React-Router', 'React-Toastify'],
    icon: 'spark',
    codeUrl: 'https://github.com/aakash-jadhav/Expense-Tracker',
    demoUrl: 'https://expense-info.netlify.app/',
  },
  {
    tone: 'pink',
    title: 'Password Generator',
    description:
      'Generate random passwords with adjustable length and optional numbers and symbols. Built with React and Vite; fast static build, hosted on Netlify.',
    tags: ['React', 'JavaScript', 'HTML', 'CSS', 'Vite'],
    icon: 'code',
    codeUrl: 'https://github.com/aakash-jadhav/PasswordGenerator',
    demoUrl: 'https://ciphercompiler.netlify.app/',
  },
  {
    tone: 'green',
    title: 'Grocery Price Tracker',
    description:
      'Offline Flutter app to log grocery purchases and compute price per unit, with comparisons to your last buy (when units match), local storage, history, analytics, and price-trend charts so spending insight stays on your device.',
    tags: ['Flutter', 'Dart', 'SQLite', 'Material UI 3'],
    icon: 'server',
    codeUrl: 'https://github.com/aakash-jadhav/Grocery-price-tracker-mobile',
    demoUrl: 'https://drive.google.com/drive/folders/1HGJkbG2facSfyllvNSl0NUJxz5ZyZ-wg?usp=drive_link',
  },
  {
    tone: 'blue',
    title: 'Hour at a Time',
    description:
      "Stop juggling everything at once—pick one task, focus for an hour, and build momentum toward your goals, one hour at a time.",
    tags: ['Flutter', 'Dart', 'Hive'],
    icon: 'mobile',
    codeUrl: 'https://github.com/aakash-jadhav/Hour-at-a-Time',
    demoUrl: 'https://drive.google.com/drive/folders/1Zlx2vX7-IDVSicZjeyWIA3198IRchNcL?usp=drive_link',
  },
] as const
