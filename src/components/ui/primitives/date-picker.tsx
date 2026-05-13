import type { ButtonHTMLAttributes } from "react"
import { FieldBase, type FieldState } from "@/components/ui/primitives/field-base"
import { cx } from "@/lib/cx"

export type CalendarDay = {
  id: string
  label: string
  muted?: boolean
  selected?: boolean
}

type DatePickerProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  helperText?: string
  instructionText?: string
  label?: string
  monthLabel?: string
  onNextMonth?: () => void
  onOpenChange?: (open: boolean) => void
  onPrevMonth?: () => void
  onSelectDay?: (day: CalendarDay) => void
  open?: boolean
  placeholder?: string
  state?: FieldState
  value?: string
  weekdays?: string[]
  weeks?: CalendarDay[][]
}

const defaultWeekdays = ["S", "M", "T", "W", "T", "F", "S"]

const defaultWeeks: CalendarDay[][] = [
  [
    { id: "prev-27", label: "27", muted: true },
    { id: "prev-28", label: "28", muted: true },
    { id: "prev-29", label: "29", muted: true },
    { id: "prev-30", label: "30", muted: true },
    { id: "1", label: "1" },
    { id: "2", label: "2" },
    { id: "3", label: "3" },
  ],
  [
    { id: "4", label: "4" },
    { id: "5", label: "5" },
    { id: "6", label: "6" },
    { id: "7", label: "7" },
    { id: "8", label: "8" },
    { id: "9", label: "9" },
    { id: "10", label: "10" },
  ],
  [
    { id: "11", label: "11" },
    { id: "12", label: "12" },
    { id: "13", label: "13" },
    { id: "14", label: "14" },
    { id: "15", label: "15" },
    { id: "16", label: "16" },
    { id: "17", label: "17" },
  ],
  [
    { id: "18", label: "18" },
    { id: "19", label: "19" },
    { id: "20", label: "20" },
    { id: "21", label: "21" },
    { id: "22", label: "22" },
    { id: "23", label: "23" },
    { id: "24", label: "24" },
  ],
  [
    { id: "25", label: "25" },
    { id: "26", label: "26" },
    { id: "27", label: "27" },
    { id: "28", label: "28" },
    { id: "29", label: "29" },
    { id: "30", label: "30" },
    { id: "31", label: "31" },
  ],
]

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <rect x="3" y="4.5" width="14" height="12.5" rx="2.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7.5h14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 3v3M13.5 3v3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M7 10.5h.01M10 10.5h.01M13 10.5h.01M7 13.5h.01M10 13.5h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  )
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 18 18" fill="none">
      <path
        d="m10.75 4.5-4.5 4.5 4.5 4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 18 18" fill="none">
      <path
        d="m7.25 4.5 4.5 4.5-4.5 4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  )
}

export function DatePicker({
  className,
  disabled = false,
  helperText,
  instructionText = "Tap a date to apply",
  label,
  monthLabel = "May 2026",
  onClick,
  onNextMonth,
  onOpenChange,
  onPrevMonth,
  onSelectDay,
  open = false,
  placeholder = "Select date",
  state = "default",
  value,
  weekdays = defaultWeekdays,
  weeks = defaultWeeks,
  ...props
}: DatePickerProps) {
  const resolvedState = open && !disabled ? "focused" : state

  const calendarPanel = open && !disabled ? (
    <div className="absolute left-0 right-0 top-full z-50 flex w-full flex-col gap-[12px] rounded-[20px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-elevated)] px-[14px] py-[14px] shadow-[var(--kr-shadow-overlay)]">
      <div className="flex h-6 items-center justify-between">
        <button className="inline-flex size-[18px] items-center justify-center text-[var(--kr-color-text-secondary)]" onClick={onPrevMonth} type="button">
          <ArrowLeftIcon className="size-[18px]" />
        </button>
        <p className="text-[14px] font-medium leading-none text-[var(--kr-color-text-primary)]">{monthLabel}</p>
        <button className="inline-flex size-[18px] items-center justify-center text-[var(--kr-color-text-secondary)]" onClick={onNextMonth} type="button">
          <ArrowRightIcon className="size-[18px]" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-x-[10px]">
        {weekdays.map((day) => (
          <span className="text-center text-[11px] font-medium leading-[18px] text-[var(--kr-color-text-muted)]" key={day}>
            {day}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-[4px]">
        {weeks.map((week, weekIndex) => (
          <div className="grid grid-cols-7 gap-x-[10px]" key={`week-${weekIndex}`}>
            {week.map((day) => (
              <button className="inline-flex h-8 items-center justify-center" key={day.id} onClick={() => onSelectDay?.(day)} type="button">
                <span
                  className={cx(
                    "inline-flex h-8 min-w-8 items-center justify-center rounded-[10px] px-[6px] text-[13px] leading-none transition-colors duration-150",
                    day.selected
                      ? "bg-[var(--kr-color-action-primary-bg)] text-[var(--kr-color-action-primary-text)]"
                      : day.muted
                        ? "text-[var(--kr-color-text-muted)]"
                        : "text-[var(--kr-color-text-secondary)]",
                  )}
                >
                  {day.label}
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>

      <p className="type-label-s text-[var(--kr-color-text-secondary)]">{instructionText}</p>
    </div>
  ) : null

  return (
    <div className="flex w-full flex-col gap-[var(--kr-space-8)]">
      <FieldBase disabled={disabled} helperText={helperText} label={label} panel={calendarPanel} state={resolvedState}>
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
          <CalendarIcon className="size-5 shrink-0 text-[var(--kr-color-text-secondary)]" />
        </button>
      </FieldBase>
    </div>
  )
}
