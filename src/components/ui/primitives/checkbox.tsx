import { useEffect, useId, useRef } from "react"
import type { InputHTMLAttributes } from "react"
import { cx } from "@/lib/cx"

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  indeterminate?: boolean
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="size-[12px]" viewBox="0 0 12 12" fill="none">
      <path
        d="M2.5 6.25 4.875 8.5 9.5 3.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg aria-hidden="true" className="size-[10px]" viewBox="0 0 10 2" fill="none">
      <path
        d="M1 1h8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export function Checkbox({
  checked,
  className,
  defaultChecked,
  disabled = false,
  id,
  indeterminate = false,
  ...props
}: CheckboxProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  return (
    <label
      className={cx(
        "group relative inline-flex size-[20px] shrink-0 items-center justify-center",
        disabled && "cursor-not-allowed",
        className,
      )}
      htmlFor={inputId}
    >
      <input
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={inputId}
        ref={inputRef}
        type="checkbox"
        className="peer absolute inset-0 m-0 cursor-inherit appearance-none opacity-0"
        {...props}
      />

      <span
        aria-hidden="true"
        className={cx(
          "inline-flex size-[20px] items-center justify-center rounded-[6px] border-[1.5px] text-[var(--kr-color-action-primary-text)] transition-colors duration-150",
          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--kr-color-accent-cyan)] peer-focus-visible:outline-offset-2",
          indeterminate
            ? "border-[var(--kr-color-action-primary-bg)] bg-[var(--kr-color-action-primary-bg)]"
            : "border-[var(--kr-color-border-strong)] bg-transparent group-has-[:checked]:border-[var(--kr-color-action-primary-bg)] group-has-[:checked]:bg-[var(--kr-color-action-primary-bg)]",
          disabled && "opacity-[0.52]",
        )}
      >
        {indeterminate ? (
          <MinusIcon />
        ) : (
          <span className="opacity-0 transition-opacity duration-150 group-has-[:checked]:opacity-100">
            <CheckIcon />
          </span>
        )}
      </span>
    </label>
  )
}
