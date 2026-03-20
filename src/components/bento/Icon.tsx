export type IconName =
  | 'user'
  | 'mail'
  | 'phone'
  | 'pin'
  | 'spark'
  | 'briefcase'
  | 'cap'
  | 'bolt'
  | 'code'
  | 'server'
  | 'mobile'
  | 'download'
  | 'folder'
  | 'crumb'
  | 'target'
  | 'document'
  | 'github'
  | 'external'
  | 'arrow-left'

export function Icon({
  name,
  className,
  pathClassName,
}: {
  name: IconName
  className?: string
  pathClassName?: string
}) {
  const strokeCls = pathClassName ?? 'stroke-slate-700/70'
  switch (name) {
    case 'user':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M20 21a8 8 0 0 0-16 0"
          />
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
          />
        </svg>
      )
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M4.5 7.5h15v9h-15z"
          />
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="m5 8 7 6 7-6"
          />
        </svg>
      )
    case 'phone':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M7.2 3.8 9.7 6.3c.4.4.5 1 .2 1.5l-1 1.8c.9 1.9 2.4 3.4 4.3 4.3l1.8-1c.5-.3 1.1-.2 1.5.2l2.5 2.5c.5.5.5 1.2 0 1.7l-1.5 1.5c-.8.8-2 1.1-3.1.7-6.2-2.1-11.1-7-13.2-13.2-.4-1.1-.1-2.3.7-3.1L5.5 3.8c.5-.5 1.2-.5 1.7 0Z"
          />
        </svg>
      )
    case 'pin':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M12 21s7-5 7-11a7 7 0 1 0-14 0c0 6 7 11 7 11Z"
          />
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M12 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
          />
        </svg>
      )
    case 'spark':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M12 2l1.4 5.1L18.5 9l-5.1 1.4L12 15.5l-1.4-5.1L5.5 9l5.1-1.9L12 2Z"
          />
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M5 14l.8 2.7L8.5 18l-2.7.8L5 21l-.8-2.2L1.5 18l2.7-1.3L5 14Z"
          />
        </svg>
      )
    case 'briefcase':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"
          />
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M5 7h14v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7Z"
          />
        </svg>
      )
    case 'cap':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Z"
          />
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M6.5 12v5c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3v-5"
          />
        </svg>
      )
    case 'bolt':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
          />
        </svg>
      )
    case 'code':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="m9 18-6-6 6-6"
          />
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="m15 6 6 6-6 6"
          />
        </svg>
      )
    case 'server':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M6 7h12M6 12h12M6 17h12"
          />
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M5 5.5c0-.8.7-1.5 1.5-1.5h11c.8 0 1.5.7 1.5 1.5v13c0 .8-.7 1.5-1.5 1.5h-11C5.7 20 5 19.3 5 18.5v-13Z"
          />
        </svg>
      )
    case 'mobile':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M9 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
          />
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M11 18h2"
          />
        </svg>
      )
    case 'download':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M12 3v10"
          />
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="m8 11 4 4 4-4"
          />
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M5 20h14"
          />
        </svg>
      )
    case 'folder':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M4 7.5A2.5 2.5 0 0 1 6.5 5H10l2 2h5.5A2.5 2.5 0 0 1 20 9.5v9A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5v-11Z"
          />
        </svg>
      )
    case 'crumb':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="m9 18 6-6-6-6"
          />
        </svg>
      )
    case 'target':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle
            className={strokeCls}
            cx="12"
            cy="12"
            r="8"
            strokeWidth="1.6"
          />
          <circle
            className={strokeCls}
            cx="12"
            cy="12"
            r="4"
            strokeWidth="1.6"
          />
          <circle
            className={strokeCls}
            cx="12"
            cy="12"
            r="1.2"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      )
    case 'document':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M8 3h6l4 4v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
          />
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M14 3v4h4"
          />
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M8 14h8M8 18h6"
          />
        </svg>
      )
    case 'github':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 1C5.9 1 1 5.9 1 12c0 4.9 3.2 9.1 7.6 10.6.6.1.8-.3.8-.6v-2c-3.1.7-3.7-1.5-3.7-1.5-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.4 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 2.9 1.1a10 10 0 0 1 5.3 0c2-1.4 2.9-1.1 2.9-1.1.6 1.5.2 2.5.1 2.8.7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.2-5.1 5.4.4.4.8 1.1.8 2.2v3.2c0 .4.2.8.8.6 4.4-1.5 7.6-5.7 7.6-10.6C23 5.9 18.1 1 12 1Z"
          />
        </svg>
      )
    case 'external':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 3h7v7"
          />
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 14 21 3"
          />
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 13v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"
          />
        </svg>
      )
    case 'arrow-left':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path
            className={strokeCls}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 12H5M11 6l-6 6 6 6"
          />
        </svg>
      )
    default:
      return null
  }
}
