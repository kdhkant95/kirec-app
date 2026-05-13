import type { HTMLAttributes } from "react"
import { cx } from "@/lib/cx"

const surfaceClasses = {
  base: "surface-base",
  elevated: "surface-elevated shadow-kr-card-elevated",
  interactive:
    "surface-elevated border-[var(--kr-color-border-strong)] shadow-kr-card-interactive",
} as const

const densityClasses = {
  default: "gap-[var(--kr-space-16)] p-[var(--kr-space-20)]",
  compact: "gap-[var(--kr-space-12)] p-[var(--kr-space-16)]",
} as const

type CardProps = HTMLAttributes<HTMLDivElement> & {
  density?: keyof typeof densityClasses
  surface?: keyof typeof surfaceClasses
}

export function Card({
  className,
  density = "default",
  surface = "base",
  ...props
}: CardProps) {
  return (
    <div
      className={cx(
        "flex flex-col rounded-[var(--kr-radius-24)]",
        densityClasses[density],
        surfaceClasses[surface],
        surface === "interactive" && "cursor-pointer",
        className,
      )}
      {...props}
    />
  )
}
