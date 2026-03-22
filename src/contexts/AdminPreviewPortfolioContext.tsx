import { createContext, useContext } from 'react'
import { useSiteContentOptional } from './SiteContentContext'
import { DEFAULT_PORTFOLIO } from '../data/siteContentDefaults'
import type { PortfolioContent } from '../data/siteContentTypes'

/** When set (e.g. admin live preview), cards read portfolio from here instead of persisted site content. */
export const AdminPreviewPortfolioContext = createContext<PortfolioContent | null>(null)

export function AdminPreviewPortfolioProvider({
  value,
  children,
}: {
  value: PortfolioContent | null
  children: React.ReactNode
}) {
  return (
    <AdminPreviewPortfolioContext.Provider value={value}>
      {children}
    </AdminPreviewPortfolioContext.Provider>
  )
}

/** Merged portfolio for bento cards: admin draft preview wins over persisted content. */
export function usePortfolioForCard(): PortfolioContent {
  const preview = useContext(AdminPreviewPortfolioContext)
  const ctx = useSiteContentOptional()
  const base = ctx?.siteContent.portfolio ?? DEFAULT_PORTFOLIO
  return preview ?? base
}
