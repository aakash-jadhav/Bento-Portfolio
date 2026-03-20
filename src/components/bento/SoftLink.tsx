import type { ReactNode } from 'react'

export function SoftLink({
  children,
  onClick,
}: {
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-800/75 hover:text-slate-900"
    >
      {children}
    </button>
  )
}
