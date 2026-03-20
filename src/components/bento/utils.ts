export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

/** Slight roundness on bento surfaces (matches “square with little roundness”) */
export const BENTO_RADIUS = 'rounded-lg'
