import type { ButtonHTMLAttributes } from "react"
import { cx } from "@/lib/cx"

type ChipTone = "neutral" | "brand" | "highlight"

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean
  tone?: ChipTone
}

const defaultToneClasses: Record<ChipTone, string> = {
  neutral:
    "border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-floating)] text-[var(--kr-color-text-secondary)]",
  brand:
    "border border-[var(--kr-color-accent-brand)] bg-[var(--kr-color-bg-floating)] text-[var(--kr-color-accent-brand)]",
  highlight:
    "border border-[var(--kr-color-accent-highlight)] bg-[var(--kr-color-bg-floating)] text-[var(--kr-color-accent-highlight)]",
}

const selectedToneClasses: Record<ChipTone, string> = {
  neutral: "bg-[var(--kr-color-accent-brand)] text-[var(--kr-color-action-primary-text)]",
  brand: "bg-[var(--kr-color-accent-brand)] text-[var(--kr-color-action-primary-text)]",
  highlight: "bg-[var(--kr-color-accent-highlight)] text-[var(--kr-color-action-primary-text)]",
}

export function Chip({
  children,
  className,
  selected = false,
  tone = "neutral",
  type = "button",
  ...props
}: ChipProps) {
  return (
    <button
      aria-pressed={selected}
      className={cx(
        "focus-ring inline-flex items-center justify-center gap-[var(--kr-space-8)] rounded-full px-[var(--kr-space-12)] py-[var(--kr-space-8)] text-[12px] font-medium leading-[16px] tracking-[0.2px] whitespace-nowrap transition-colors duration-150",
        selected ? selectedToneClasses[tone] : defaultToneClasses[tone],
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
