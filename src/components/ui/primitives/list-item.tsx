import type { ButtonHTMLAttributes, ReactNode } from "react"
import { Badge } from "@/components/ui/primitives/badge"
import { cx } from "@/lib/cx"

type ListItemVariant = "simple" | "supporting" | "metric"

type ListItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode
  iconTone?: "brand" | "violet" | "orange"
  meta?: ReactNode
  metric?: ReactNode
  selected?: boolean
  supportingText?: string
  tagLabel?: string
  title: string
  variant?: ListItemVariant
}

const variantClasses: Record<ListItemVariant, string> = {
  simple: "min-h-[84px]",
  supporting: "min-h-[96px]",
  metric: "min-h-[92px]",
}

const iconToneClasses = {
  brand: "bg-[var(--kr-color-accent-brand)] text-[var(--kr-color-action-primary-text)]",
  violet: "bg-[var(--kr-color-accent-violet)] text-[var(--kr-color-text-primary)]",
  orange: "bg-[var(--kr-color-accent-orange)] text-[var(--kr-color-action-primary-text)]",
} as const

export function ListItem({
  className,
  icon,
  iconTone = "brand",
  meta,
  metric,
  selected = false,
  supportingText,
  tagLabel,
  title,
  type = "button",
  variant = "simple",
  ...props
}: ListItemProps) {
  return (
    <button
      className={cx(
        "focus-ring flex w-full items-center justify-between rounded-[20px] border p-[var(--kr-space-16)] text-left transition-colors duration-150",
        variantClasses[variant],
        selected
          ? "border-[var(--kr-color-border-strong)] bg-[var(--kr-color-bg-elevated)]"
          : "border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-surface)]",
        className,
      )}
      type={type}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-[14px]">
        {icon ? (
          <span
            aria-hidden="true"
            className={cx(
              "inline-flex size-10 shrink-0 items-center justify-center rounded-[14px] [&_svg]:size-[18px]",
              iconToneClasses[iconTone],
            )}
          >
            {icon}
          </span>
        ) : null}

        <div className="min-w-0">
          <p className="truncate text-[16px] font-medium leading-[22px] text-[var(--kr-color-text-primary)]">
            {title}
          </p>
          {supportingText ? (
            <p className="mt-[4px] truncate text-[14px] leading-[20px] text-[var(--kr-color-text-secondary)]">
              {supportingText}
            </p>
          ) : null}
        </div>
      </div>

      <div className="ml-[14px] flex shrink-0 flex-col items-end justify-center">
        {metric ? (
          <>
            <div className="text-[20px] font-bold leading-[24px] text-[var(--kr-color-accent-orange)]">
              {metric}
            </div>
            {tagLabel ? (
              <Badge className="mt-[6px]" tone="neutral">
                {tagLabel}
              </Badge>
            ) : null}
          </>
        ) : meta ? (
          <div className="text-[14px] leading-[20px] text-[var(--kr-color-text-muted)]">{meta}</div>
        ) : null}
      </div>
    </button>
  )
}
