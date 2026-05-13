import type { ButtonHTMLAttributes } from "react"
import { cx } from "@/lib/cx"

const buttonSizeClasses = {
  m: "min-h-[42px] rounded-[var(--kr-radius-16)] px-[var(--kr-space-16)] py-[var(--kr-space-12)]",
  l: "min-h-[50px] rounded-[var(--kr-radius-20)] px-[var(--kr-space-20)] py-[var(--kr-space-16)]",
} as const

const enabledToneClasses = {
  primary: "bg-[var(--kr-color-action-primary-bg)] text-[var(--kr-color-action-primary-text)]",
  secondary:
    "border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-floating)] text-[var(--kr-color-text-primary)]",
} as const

const disabledToneClasses = {
  primary:
    "border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-floating)] text-[var(--kr-color-text-muted)]",
  secondary:
    "border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-surface)] text-[var(--kr-color-text-muted)]",
} as const

export type ButtonTone = keyof typeof enabledToneClasses
export type ButtonSize = keyof typeof buttonSizeClasses

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize
  tone?: ButtonTone
}

function getToneClasses(tone: ButtonTone, disabled: boolean) {
  return disabled ? disabledToneClasses[tone] : enabledToneClasses[tone]
}

export function Button({
  className,
  disabled = false,
  size = "l",
  tone = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      data-size={size}
      data-tone={tone}
      disabled={disabled}
      type={type}
      className={cx(
        "focus-ring inline-flex w-fit items-center justify-center gap-[var(--kr-space-8)] whitespace-nowrap text-[14px] font-medium leading-[18px] transition-colors duration-150",
        buttonSizeClasses[size],
        getToneClasses(tone, disabled),
        className,
      )}
      {...props}
    />
  )
}
