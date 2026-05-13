import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cx } from "@/lib/cx"
import type { ButtonSize, ButtonTone } from "@/components/ui/primitives/button"

const iconButtonSizeClasses = {
  m: {
    button: "size-[42px] rounded-[var(--kr-radius-16)]",
    icon: "size-[18px]",
  },
  l: {
    button: "size-[50px] rounded-[var(--kr-radius-20)]",
    icon: "size-[20px]",
  },
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

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  size?: ButtonSize
  tone?: ButtonTone
}

function getToneClasses(tone: ButtonTone, disabled: boolean) {
  return disabled ? disabledToneClasses[tone] : enabledToneClasses[tone]
}

export function IconButton({
  children,
  className,
  disabled = false,
  size = "m",
  tone = "primary",
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      data-size={size}
      data-tone={tone}
      disabled={disabled}
      type={type}
      className={cx(
        "focus-ring inline-flex items-center justify-center transition-colors duration-150",
        iconButtonSizeClasses[size].button,
        getToneClasses(tone, disabled),
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cx(
          "inline-flex items-center justify-center [&_img]:size-full [&_svg]:size-full",
          iconButtonSizeClasses[size].icon,
          disabled && "opacity-[0.42]",
        )}
      >
        {children}
      </span>
    </button>
  )
}
