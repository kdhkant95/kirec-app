import { useId } from "react"
import type { InputHTMLAttributes } from "react"
import { cx } from "@/lib/cx"

type ToggleProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {}

export function Toggle({
  checked,
  className,
  defaultChecked,
  disabled = false,
  id,
  ...props
}: ToggleProps) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <label
      className={cx(
        "relative inline-flex h-[28px] w-[44px] shrink-0 items-center",
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
        role="switch"
        type="checkbox"
        className="peer absolute inset-0 m-0 cursor-inherit appearance-none opacity-0"
        {...props}
      />

      <span
        aria-hidden="true"
        className={cx(
          "absolute inset-0 rounded-[14px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-elevated)] transition-colors duration-150",
          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--kr-color-accent-cyan)] peer-focus-visible:outline-offset-2",
          "peer-checked:border-transparent peer-checked:bg-[var(--kr-color-action-primary-bg)]",
          disabled && "opacity-[0.72]",
        )}
      />

      <span
        aria-hidden="true"
        className={cx(
          "absolute left-[4px] top-[4px] size-[20px] rounded-full bg-[var(--kr-color-text-secondary)] transition-[transform,background-color] duration-150",
          "peer-checked:translate-x-[18px] peer-checked:bg-[var(--kr-color-action-primary-text)]",
          disabled && "opacity-[0.72]",
        )}
      />
    </label>
  )
}
