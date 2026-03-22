/**
 * Admin panel surface + form tokens (off-white ~ slate-100, matches reference UI).
 * Used for gutters between columns, preview column bg, and form fields.
 */
export const adminSurfaceClass = 'bg-[#f1f5f9]'

/** Form controls: borderless off-white fill, generous radius */
export const adminInputClass =
  'w-full rounded-2xl border-0 bg-[#f1f5f9] px-4 py-3 text-sm text-[#0f172a] shadow-none outline-none ring-0 transition placeholder:text-[#94a3b8] focus:ring-2 focus:ring-[#4f46e5]/25'

/** Grid: 25% first column, remaining 75% split evenly → 2 : 3 : 3 */
export const adminThreeColumnGridClass =
  'grid h-full min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)_minmax(0,3fr)]'
