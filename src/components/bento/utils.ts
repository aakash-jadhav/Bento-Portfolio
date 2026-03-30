export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

/** Slight roundness on bento surfaces (matches “square with little roundness”) */
export const BENTO_RADIUS = 'rounded-lg'

/** Body / supporting copy — same as featured project description for consistent contrast */
export const PORTFOLIO_BODY_TEXT_CLASS =
  'text-sm leading-snug text-slate-950 wrap-anywhere'
