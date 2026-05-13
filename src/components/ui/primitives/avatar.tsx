import type { HTMLAttributes } from "react"
import { cx } from "@/lib/cx"

type AvatarSize = "s" | "m" | "l"
type AvatarContent = "initials" | "placeholder"

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  content?: AvatarContent
  initials?: string
  size?: AvatarSize
}

const sizeClasses = {
  s: {
    container: "size-[32px]",
    icon: "size-[16px]",
    text: "text-[12px] font-medium leading-[16px]",
  },
  m: {
    container: "size-[40px]",
    icon: "size-[20px]",
    text: "text-[14px] font-medium leading-[18px]",
  },
  l: {
    container: "size-[56px]",
    icon: "size-[24px]",
    text: "text-[18px] font-medium leading-[22px]",
  },
} as const

function normalizeInitials(initials?: string) {
  const trimmed = initials?.trim()

  if (!trimmed) {
    return "?"
  }

  return trimmed.slice(0, 2).toUpperCase()
}

function ProfileIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" fill="currentColor" />
      <path
        d="M6.25 17.5c0-2.65 3.14-4.25 5.75-4.25s5.75 1.6 5.75 4.25c0 .69-.56 1.25-1.25 1.25H7.5c-.69 0-1.25-.56-1.25-1.25Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Avatar({
  className,
  content = "placeholder",
  initials,
  size = "m",
  ...props
}: AvatarProps) {
  const styles = sizeClasses[size]

  return (
    <div
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        styles.container,
        content === "initials"
          ? "border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-accent-violet)] text-[var(--kr-color-text-primary)]"
          : "border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-elevated)] text-[var(--kr-color-text-muted)]",
        className,
      )}
      {...props}
    >
      {content === "initials" ? (
        <span className={cx("select-none text-center uppercase", styles.text)}>
          {normalizeInitials(initials)}
        </span>
      ) : (
        <ProfileIcon className={styles.icon} />
      )}
    </div>
  )
}
