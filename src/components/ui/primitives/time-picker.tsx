import type { ButtonHTMLAttributes } from "react"
import { FieldBase, type FieldState } from "@/components/ui/primitives/field-base"
import { cx } from "@/lib/cx"

export type TimeOption = {
  label: string
  value: string
}

type TimePickerProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  helperText?: string
  label?: string
  onOpenChange?: (open: boolean) => void
  onValueChange?: (value: string) => void
  open?: boolean
  options?: TimeOption[]
  placeholder?: string
  prompt?: string
  state?: FieldState
  value?: string
}

const defaultOptions: TimeOption[] = [
  { label: "18:00", value: "18:00" },
  { label: "18:30", value: "18:30" },
  { label: "19:00", value: "19:00" },
  { label: "19:30", value: "19:30" },
  { label: "20:00", value: "20:00" },
]

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6.5v4l2.5 1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  )
}

export function TimePicker({
  className,
  disabled = false,
  helperText,
  label,
  onClick,
  onOpenChange,
  onValueChange,
  open = false,
  options = defaultOptions,
  placeholder = "Select time",
  prompt = "Choose time",
  state = "default",
  value,
  ...props
}: TimePickerProps) {
  const resolvedState = open && !disabled ? "focused" : state

  const timePanel = open && !disabled ? (
    <div className="absolute left-0 right-0 top-full z-50 flex w-full flex-col gap-[6px] rounded-[20px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-elevated)] p-[10px] shadow-[var(--kr-shadow-overlay)]">
      <p className="px-[4px] text-[13px] font-medium leading-[20px] text-[var(--kr-color-text-primary)]">{prompt}</p>
      {options.map((option) => {
        const isSelected = option.value === value
        return (
          <button
            className={cx(
              "type-body-m flex h-[40px] w-full items-center justify-between rounded-[14px] px-[14px] py-[12px] text-left transition-colors duration-150",
              isSelected ? "bg-[#23242b] text-[var(--kr-color-text-primary)]" : "text-[var(--kr-color-text-secondary)]",
            )}
            key={option.value}
            onClick={() => {
              onValueChange?.(option.value)
              onOpenChange?.(false)
            }}
            type="button"
          >
            {option.label}
          </button>
        )
      })}
    </div>
  ) : null

  return (
    <div className="flex w-full flex-col gap-[var(--kr-space-8)]">
      <FieldBase disabled={disabled} helperText={helperText} label={label} panel={timePanel} state={resolvedState}>
        <button
          aria-expanded={open}
          className={cx(
            "type-body-l -mx-4 -my-4 flex min-w-0 flex-1 items-center justify-between gap-[var(--kr-space-12)] bg-transparent px-4 py-4 text-left outline-none",
            disabled ? "text-[var(--kr-color-text-muted)]" : "text-[var(--kr-color-text-primary)]",
            className,
          )}
          disabled={disabled}
          onClick={(event) => {
            onClick?.(event)
            if (!event.defaultPrevented) {
              onOpenChange?.(!open)
            }
          }}
          type="button"
          {...props}
        >
          <span className={cx("min-w-0 flex-1 truncate", value ? "text-[var(--kr-color-text-primary)]" : "text-[var(--kr-color-text-muted)]")}>
            {value ?? placeholder}
          </span>
          <ClockIcon className="size-5 shrink-0 text-[var(--kr-color-text-secondary)]" />
        </button>
      </FieldBase>
    </div>
  )
}
