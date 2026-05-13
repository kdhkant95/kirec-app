import type { HTMLAttributes } from "react"
import { cx } from "@/lib/cx"

type StepperProps = HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean
  max?: number
  min?: number
  onDecrement?: () => void
  onIncrement?: () => void
  value: number
}

function MinusCircleIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 9h6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  )
}

function AddCircleIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 6v6M6 9h6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  )
}

export function Stepper({
  className,
  disabled = false,
  max,
  min = 1,
  onDecrement,
  onIncrement,
  value,
  ...props
}: StepperProps) {
  const decrementDisabled = disabled || value <= min
  const incrementDisabled = disabled || (typeof max === "number" && value >= max)

  return (
    <div
      className={cx(
        "flex h-[52px] items-center justify-between rounded-[18px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-elevated)] p-[8px]",
        disabled && "opacity-[0.72]",
        className,
      )}
      {...props}
    >
      <button
        aria-label="감소"
        className={cx(
          "focus-ring inline-flex size-[36px] items-center justify-center rounded-[18px] bg-transparent text-[var(--kr-color-text-secondary)]",
          decrementDisabled && "opacity-[0.4]",
        )}
        disabled={decrementDisabled}
        onClick={onDecrement}
        type="button"
      >
        <MinusCircleIcon className="size-[18px]" />
      </button>

      <span className={cx("type-body-m text-[var(--kr-color-text-primary)]", disabled && "text-[rgba(245,247,251,0.55)]")}>
        {value}
      </span>

      <button
        aria-label="증가"
        className={cx(
          "focus-ring inline-flex size-[36px] items-center justify-center rounded-[18px] bg-transparent text-[var(--kr-color-text-secondary)]",
          incrementDisabled && "opacity-[0.4]",
        )}
        disabled={incrementDisabled}
        onClick={onIncrement}
        type="button"
      >
        <AddCircleIcon className="size-[18px]" />
      </button>
    </div>
  )
}
