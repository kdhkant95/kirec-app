import { cx } from "@/lib/cx"

type BadgeTone = "neutral" | "success" | "warning" | "danger"
type BadgeStyle = "subtle" | "solid"

type BadgeProps = {
  children: React.ReactNode
  className?: string
  style?: BadgeStyle
  tone?: BadgeTone
}

const subtleClasses: Record<BadgeTone, string> = {
  neutral:
    "border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-floating)] text-[var(--kr-color-text-secondary)]",
  success:
    "border border-[var(--kr-color-state-success)] bg-[var(--kr-color-bg-floating)] text-[var(--kr-color-state-success)]",
  warning:
    "border border-[var(--kr-color-accent-orange)] bg-[var(--kr-color-bg-floating)] text-[var(--kr-color-accent-orange)]",
  danger:
    "border border-[var(--kr-color-state-danger)] bg-[var(--kr-color-bg-floating)] text-[var(--kr-color-state-danger)]",
}

const solidClasses: Record<BadgeTone, string> = {
  neutral: "bg-[var(--kr-color-accent-brand)] text-[var(--kr-color-action-primary-text)]",
  success: "bg-[var(--kr-color-state-success)] text-[var(--kr-color-action-primary-text)]",
  warning: "bg-[var(--kr-color-accent-orange)] text-[var(--kr-color-action-primary-text)]",
  danger: "bg-[var(--kr-color-state-danger)] text-[var(--kr-color-action-primary-text)]",
}

export function Badge({
  children,
  className,
  style = "subtle",
  tone = "neutral",
}: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center justify-center gap-[var(--kr-space-4)] rounded-full px-[var(--kr-space-8)] py-[var(--kr-space-4)] text-[12px] font-medium leading-[16px] tracking-[0.2px] whitespace-nowrap",
        style === "solid" ? solidClasses[tone] : subtleClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
