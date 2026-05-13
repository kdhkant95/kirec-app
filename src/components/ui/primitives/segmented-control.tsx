import { cx } from "@/lib/cx"

type SegmentedControlProps<T extends string> = {
  className?: string
  onValueChange?: (value: T) => void
  options: readonly T[]
  value: T
}

export function SegmentedControl<T extends string>({
  className,
  onValueChange,
  options,
  value,
}: SegmentedControlProps<T>) {
  return (
    <div
      className={cx(
        "inline-flex h-[56px] items-center gap-[3px] rounded-[15px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-elevated)] p-[3px]",
        className,
      )}
      role="tablist"
    >
      {options.map((option) => {
        const isSelected = option === value

        return (
          <button
            key={option}
            aria-selected={isSelected}
            className={cx(
              "focus-ring inline-flex h-[50px] items-center justify-center rounded-[12px] px-[14px] text-[14px] leading-[18px] whitespace-nowrap transition-colors duration-150",
              isSelected
                ? "bg-[#23242b] text-[var(--kr-color-text-primary)]"
                : "text-[var(--kr-color-text-secondary)]",
            )}
            onClick={() => onValueChange?.(option)}
            role="tab"
            type="button"
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
