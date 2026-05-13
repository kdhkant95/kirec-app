import { useId } from "react"
import type { InputHTMLAttributes } from "react"
import { cx } from "@/lib/cx"

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {}

export function Radio({
  checked,
  className,
  defaultChecked,
  disabled = false,
  id,
  ...props
}: RadioProps) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <label
      className={cx(
        "relative inline-flex size-[20px] shrink-0 items-center justify-center",
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
        type="radio"
        className="peer absolute inset-0 m-0 cursor-inherit appearance-none opacity-0"
        {...props}
      />

      <span
        aria-hidden="true"
        className={cx(
          "inline-flex size-[20px] items-center justify-center rounded-full border-[1.5px] transition-colors duration-150",
          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--kr-color-accent-cyan)] peer-focus-visible:outline-offset-2",
          "border-[var(--kr-color-border-strong)] bg-transparent peer-checked:border-[var(--kr-color-action-primary-bg)] peer-checked:bg-[var(--kr-color-action-primary-bg)]",
          disabled && "opacity-[0.52]",
        )}
      >
        <span className="size-[8px] scale-0 rounded-full bg-[var(--kr-color-action-primary-text)] transition-transform duration-150 peer-checked:scale-100" />
      </span>
    </label>
  )
}
