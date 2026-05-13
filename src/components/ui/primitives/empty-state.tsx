import type { ReactNode } from "react"
import { Button } from "@/components/ui/primitives/button"
import { Card } from "@/components/ui/primitives/card"
import { cx } from "@/lib/cx"

type EmptyStateProps = {
  actionLabel?: string
  className?: string
  description: string
  icon?: ReactNode
  onAction?: () => void
  size?: "inline" | "full"
  title: string
}

const sizeClasses = {
  inline: {
    card: "min-h-[230px] gap-[16px] rounded-[24px] px-[24px] py-[24px]",
    description: "type-body-l max-w-[280px] text-center",
    icon: "size-[28px]",
    title: "text-[20px] font-bold leading-[26px]",
  },
  full: {
    card: "min-h-[340px] gap-[20px] rounded-[24px] px-[24px] py-[32px]",
    description: "type-body-l max-w-[280px] text-center",
    icon: "size-[34px]",
    title: "text-[24px] font-bold leading-[30px]",
  },
} as const

export function EmptyState({
  actionLabel,
  className,
  description,
  icon,
  onAction,
  size = "inline",
  title,
}: EmptyStateProps) {
  const styles = sizeClasses[size]

  return (
    <Card
      className={cx(
        "items-center justify-center text-center",
        size === "full" ? "surface-elevated" : "",
        styles.card,
        className,
      )}
      surface={size === "full" ? "elevated" : "base"}
    >
      {icon ? (
        <div className={cx("text-[var(--kr-color-text-primary)] [&_svg]:size-full", styles.icon)}>{icon}</div>
      ) : null}

      <div className="flex flex-col items-center justify-center gap-[8px]">
        <p className={cx("text-[var(--kr-color-text-primary)]", styles.title)}>{title}</p>
        <p className={cx("text-[var(--kr-color-text-secondary)]", styles.description)}>{description}</p>
      </div>

      {actionLabel ? (
        <Button onClick={onAction} size={size === "full" ? "l" : "m"} tone="primary">
          {actionLabel}
        </Button>
      ) : null}
    </Card>
  )
}
