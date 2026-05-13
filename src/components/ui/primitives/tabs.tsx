import { cx } from "@/lib/cx"

type TabsProps<T extends string> = {
  className?: string
  onValueChange?: (value: T) => void
  options: readonly T[]
  value: T
}

export function Tabs<T extends string>({
  className,
  onValueChange,
  options,
  value,
}: TabsProps<T>) {
  return (
    <div className={cx("flex h-[56px] w-full flex-col", className)}>
      <div className="flex h-[55px] items-center justify-between">
        {options.map((option) => {
          const isSelected = option === value

          return (
            <button
              key={option}
              aria-selected={isSelected}
              className="focus-ring flex min-w-0 flex-1 flex-col items-center justify-center gap-[10px] px-[4px]"
              onClick={() => onValueChange?.(option)}
              role="tab"
              type="button"
            >
              <span
                className={cx(
                  "text-[14px] leading-[20px] whitespace-nowrap transition-colors duration-150",
                  isSelected
                    ? "font-medium text-[var(--kr-color-text-primary)]"
                    : "font-normal text-[var(--kr-color-text-muted)]",
                )}
              >
                {option}
              </span>
              <span
                className={cx(
                  "h-[3px] w-[36px] rounded-full",
                  isSelected && "bg-[var(--kr-color-accent-brand)]",
                )}
              />
            </button>
          )
        })}
      </div>
      <div className="h-px w-full bg-[var(--kr-color-border-subtle)]" />
    </div>
  )
}
