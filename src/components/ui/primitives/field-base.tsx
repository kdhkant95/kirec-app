import type { ReactNode } from "react"
import { cx } from "@/lib/cx"

export type FieldState = "default" | "focused" | "error" | "disabled"

type FieldBaseProps = {
  children: ReactNode
  disabled?: boolean
  helperText?: string
  label?: string
  panel?: ReactNode
  state?: FieldState
}

const labelClasses = {
  default: "text-[var(--kr-color-text-secondary)]",
  focused: "text-[var(--kr-color-accent-brand)]",
  error: "text-[var(--kr-color-state-danger)]",
  disabled: "text-[var(--kr-color-text-muted)]",
} as const

const helperClasses = {
  default: "text-[var(--kr-color-text-muted)]",
  focused: "text-[var(--kr-color-text-muted)]",
  error: "text-[var(--kr-color-state-danger)]",
  disabled: "text-[var(--kr-color-text-muted)]",
} as const

const frameClasses = {
  default:
    "border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-floating)] text-[var(--kr-color-text-primary)]",
  focused:
    "border border-[var(--kr-color-field-focus)] bg-[var(--kr-color-bg-floating)] text-[var(--kr-color-text-primary)] shadow-[inset_0_0_0_1px_var(--kr-color-field-focus)]",
  error:
    "border border-[var(--kr-color-state-danger)] bg-[var(--kr-color-bg-floating)] text-[var(--kr-color-text-primary)] shadow-[inset_0_0_0_1px_var(--kr-color-state-danger)]",
  disabled:
    "border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-surface)] text-[var(--kr-color-text-muted)]",
} as const

export function FieldBase({
  children,
  disabled = false,
  helperText,
  label,
  panel,
  state = "default",
}: FieldBaseProps) {
  const resolvedState = disabled ? "disabled" : state

  return (
    <div className="flex w-full flex-col items-start gap-[var(--kr-space-8)]">
      {label ? (
        <label className={cx("type-label-m", labelClasses[resolvedState])}>
          {label}
        </label>
      ) : null}

      <div className="relative w-full">
        <div
          className={cx(
            "flex w-full items-center gap-[12px] rounded-[var(--kr-radius-16)] p-[var(--kr-space-16)] transition-colors duration-150",
            frameClasses[resolvedState],
          )}
        >
          {children}
        </div>
        {panel}
      </div>

      {helperText ? (
        <p className={cx("type-label-s w-full", helperClasses[resolvedState])}>{helperText}</p>
      ) : null}
    </div>
  )
}
