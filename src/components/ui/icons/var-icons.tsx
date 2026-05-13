type AppIconProps = {
  active?: boolean
  className?: string
}

export function AppHomeIcon({ active = false, className }: AppIconProps) {
  if (active) {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
        <path d="m10 3 6 4.75v7.75a1.5 1.5 0 0 1-1.5 1.5h-3.25V12H8.75v5H5.5A1.5 1.5 0 0 1 4 15.5V7.75L10 3Z" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <path d="m10 3 6 4.75v7.75a1.5 1.5 0 0 1-1.5 1.5h-3.25V12H8.75v5H5.5A1.5 1.5 0 0 1 4 15.5V7.75L10 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" />
    </svg>
  )
}

export function AppMatchesIcon({ active = false, className }: AppIconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <rect x="3" y="4.25" width="14" height="12.75" rx="2.25" stroke="currentColor" strokeWidth={active ? "1.9" : "1.5"} />
      <path d="M3 7.5h14" stroke="currentColor" strokeWidth={active ? "1.9" : "1.5"} />
      <path d="M6.5 3v3M13.5 3v3" stroke="currentColor" strokeLinecap="round" strokeWidth={active ? "1.9" : "1.5"} />
      {active ? <circle cx="10" cy="11.5" r="2" fill="currentColor" /> : null}
    </svg>
  )
}

export function AppReviewIcon({ active = false, className }: AppIconProps) {
  if (active) {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
        <rect x="3" y="4.25" width="14" height="11.5" rx="3" fill="currentColor" />
        <path d="m8.25 8 4 2.5-4 2.5V8Z" fill="var(--kr-color-bg-floating)" />
        <path d="M5.75 4.25V7M10 4.25V7M14.25 4.25V7" stroke="var(--kr-color-bg-floating)" strokeLinecap="round" strokeWidth="1.2" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <rect x="3" y="4.25" width="14" height="11.5" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="m8.25 8 4 2.5-4 2.5V8Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M5.75 4.25V7M10 4.25V7M14.25 4.25V7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
    </svg>
  )
}

export function AppTeamIcon({ active = false, className }: AppIconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <circle cx="8" cy="8" r="2.75" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "1.2" : "1.5"} />
      <circle cx="13.75" cy="9" r="2.25" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "1.2" : "1.5"} opacity={active ? "0.72" : "1"} />
      <path d="M4.5 15c0-2 2-3.5 4-3.5s4 1.5 4 3.5" stroke="currentColor" strokeLinecap="round" strokeWidth={active ? "1.7" : "1.5"} />
      <path d="M11.5 14.75c.25-1.5 1.65-2.5 3.15-2.5 1.1 0 2.1.55 2.85 1.5" stroke="currentColor" strokeLinecap="round" strokeWidth={active ? "1.7" : "1.5"} opacity={active ? "0.72" : "1"} />
    </svg>
  )
}

export function ShareIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <circle cx="15" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15" cy="15" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m7 8.75 6-2.5M7 11.25l6 2.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  )
}

export function PlusIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  )
}

export function ClipIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <rect x="3" y="4.25" width="14" height="11.5" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="m8.25 8 4 2.5-4 2.5V8Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  )
}

export function AppStatsIcon({ active = false, className }: AppIconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <rect x="3.5" y="12" width="2.5" height="5" rx="0.8" fill={active ? "currentColor" : "none"} stroke={active ? "none" : "currentColor"} strokeWidth="1.5" />
      <rect x="8.75" y="8" width="2.5" height="9" rx="0.8" fill={active ? "currentColor" : "none"} stroke={active ? "none" : "currentColor"} strokeWidth="1.5" />
      <rect x="14" y="4" width="2.5" height="13" rx="0.8" fill={active ? "currentColor" : "none"} stroke={active ? "none" : "currentColor"} strokeWidth="1.5" />
    </svg>
  )
}

export function AppSettingsIcon({ active = false, className }: AppIconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="2.5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "1.8" : "1.5"} />
      <path
        d="M10 2.5V4.5M10 15.5V17.5M2.5 10H4.5M15.5 10H17.5M4.9 4.9l1.4 1.4M13.7 13.7l1.4 1.4M15.1 4.9l-1.4 1.4M6.3 13.7l-1.4 1.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={active ? "1.8" : "1.5"}
      />
    </svg>
  )
}

export function VideoCircleIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="m6.5 6.25 4 2.25-4 2.25V6.25Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.2" />
    </svg>
  )
}

export function CommentIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 16 16" fill="none">
      <path
        d="M2 5.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3.5a2 2 0 0 1-2 2H9.5L7 13v-2H4a2 2 0 0 1-2-2V5.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
    </svg>
  )
}
