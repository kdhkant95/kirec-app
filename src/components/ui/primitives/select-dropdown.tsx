import type { ButtonHTMLAttributes, ReactNode } from "react"
import { Avatar } from "@/components/ui/primitives/avatar"
import { FieldBase, type FieldState } from "@/components/ui/primitives/field-base"
import { cx } from "@/lib/cx"

export type SelectLeading = "none" | "icon" | "avatar"

export type SelectOption = {
  avatarInitials?: string
  label: string
  leadingIcon?: ReactNode
  value: string
}

type SelectDropdownProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  helperText?: string
  label?: string
  leading?: SelectLeading
  leadingAvatarInitials?: string
  leadingIcon?: ReactNode
  onOpenChange?: (open: boolean) => void
  onValueChange?: (value: string) => void
  open?: boolean
  options: SelectOption[]
  placeholder?: string
  state?: FieldState
  value?: string
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <circle cx="7.4" cy="7.2" r="2.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13.4" cy="8" r="2.1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.3 15.7c.6-2.1 2.15-3.4 4.1-3.4s3.5 1.3 4.1 3.4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M11.8 14.9c.55-.95 1.55-1.55 2.65-1.55 1.15 0 2.15.65 2.75 1.75" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  )
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  )
}

function getInitialsFromLabel(label: string) {
  const parts = label.trim().split(/\s+/).filter(Boolean)

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }

  return label.trim().slice(0, 2).toUpperCase()
}

export function SelectDropdown({
  className,
  disabled = false,
  helperText,
  label,
  leading = "none",
  leadingAvatarInitials,
  leadingIcon,
  onClick,
  onOpenChange,
  onValueChange,
  open = false,
  options,
  placeholder = "Select option",
  state = "default",
  value,
  ...props
}: SelectDropdownProps) {
  const selectedOption = options.find((option) => option.value === value)
  const isDisabled = disabled || state === "disabled"
  const resolvedState = open && !isDisabled ? "focused" : state
  const selectedTextClass = isDisabled
    ? "text-[var(--kr-color-text-muted)]"
    : "text-[var(--kr-color-text-primary)]"
  const placeholderTextClass = "text-[var(--kr-color-text-muted)]"
  const leadingTextClass = isDisabled
    ? "text-[var(--kr-color-text-muted)] opacity-60"
    : "text-[var(--kr-color-text-primary)]"
  const arrowTextClass = isDisabled
    ? "text-[var(--kr-color-text-muted)] opacity-40"
    : resolvedState === "error"
      ? "text-[var(--kr-color-state-warning)]"
      : "text-[var(--kr-color-text-secondary)]"

  function renderLeading(option?: SelectOption) {
    if (leading === "icon") {
      return (
        <span className={cx("inline-flex size-5 shrink-0 items-center justify-center", leadingTextClass)}>
          {option?.leadingIcon ?? leadingIcon ?? <UsersIcon className="size-5" />}
        </span>
      )
    }

    if (leading === "avatar") {
      const initials = option
        ? option.avatarInitials ?? getInitialsFromLabel(option.label)
        : leadingAvatarInitials

      return (
        <Avatar
          className={cx(isDisabled && "opacity-60")}
          content={option || initials ? "initials" : "placeholder"}
          initials={initials}
          size="s"
        />
      )
    }

    return null
  }

  const dropdownPanel = open && !isDisabled ? (
    <div className="absolute left-0 right-0 top-full z-50 flex w-full flex-col gap-[4px] overflow-hidden rounded-[18px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-elevated)] p-[6px] shadow-[var(--kr-shadow-overlay)]">
      {options.map((option) => {
        const isSelected = option.value === value
        return (
          <button
            className={cx(
              "type-body-m flex h-[44px] w-full items-center gap-[var(--kr-space-8)] rounded-[12px] px-[14px] py-[12px] text-left transition-colors duration-150",
              isSelected
                ? "bg-[#23242b] text-[var(--kr-color-text-primary)]"
                : "text-[var(--kr-color-text-secondary)]",
            )}
            key={option.value}
            onClick={() => {
              onValueChange?.(option.value)
              onOpenChange?.(false)
            }}
            type="button"
          >
            {renderLeading(option)}
            <span className="min-w-0 flex-1 truncate">{option.label}</span>
          </button>
        )
      })}
    </div>
  ) : null

  return (
    <div className="flex w-full flex-col gap-[var(--kr-space-8)]">
      <FieldBase disabled={isDisabled} helperText={helperText} label={label} panel={dropdownPanel} state={resolvedState}>
        <button
          aria-expanded={open}
          className={cx(
            "type-body-l -mx-4 -my-4 flex min-w-0 flex-1 items-center gap-[var(--kr-space-8)] bg-transparent px-4 py-4 text-left outline-none",
            isDisabled ? "text-[var(--kr-color-text-muted)]" : "text-[var(--kr-color-text-primary)]",
            className,
          )}
          disabled={isDisabled}
          onClick={(event) => {
            onClick?.(event)

            if (!event.defaultPrevented) {
              onOpenChange?.(!open)
            }
          }}
          type="button"
          {...props}
        >
          {renderLeading(selectedOption)}

          <span
            className={cx(
              "min-w-0 flex-1 truncate",
              selectedOption ? selectedTextClass : placeholderTextClass,
            )}
          >
            {selectedOption?.label ?? placeholder}
          </span>

          <ArrowDownIcon
            className={cx(
              "size-5 shrink-0 transition-transform duration-150",
              arrowTextClass,
              open && "rotate-180",
            )}
          />
        </button>
      </FieldBase>
    </div>
  )
}
