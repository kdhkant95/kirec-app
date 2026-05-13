import type { InputHTMLAttributes, SVGProps } from "react"
import { FieldBase, type FieldState } from "@/components/ui/primitives/field-base"
import { cx } from "@/lib/cx"

type SearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
  helperText?: string
  onClear?: () => void
  state?: FieldState
}

function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        d="M11.5 20a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="m20 20-1.8-1.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function ClearIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="m15 9-6 6m0-6 6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

export function SearchField({
  className,
  disabled = false,
  helperText,
  onClear,
  state = "default",
  value,
  ...props
}: SearchFieldProps) {
  const hasValue = typeof value === "string" ? value.length > 0 : false

  return (
    <FieldBase disabled={disabled} helperText={helperText} state={state}>
      <SearchIcon
        className={cx(
          "size-5 shrink-0",
          disabled ? "text-[var(--kr-color-text-muted)] opacity-[0.42]" : "text-[var(--kr-color-text-muted)]",
        )}
      />

      <input
        className={cx(
          "type-body-l min-w-0 flex-1 bg-transparent text-[var(--kr-color-text-primary)] outline-none placeholder:text-[var(--kr-color-text-muted)] disabled:text-[var(--kr-color-text-muted)]",
          className,
        )}
        disabled={disabled}
        type="search"
        value={value}
        {...props}
      />

      {hasValue && !disabled ? (
        <button
          aria-label="검색어 지우기"
          className="inline-flex size-5 shrink-0 items-center justify-center text-[var(--kr-color-text-muted)]"
          onClick={onClear}
          type="button"
        >
          <ClearIcon className="size-5" />
        </button>
      ) : null}
    </FieldBase>
  )
}
