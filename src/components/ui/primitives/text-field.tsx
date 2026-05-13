import type { InputHTMLAttributes } from "react"
import { FieldBase, type FieldState } from "@/components/ui/primitives/field-base"
import { cx } from "@/lib/cx"

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  helperText?: string
  label?: string
  state?: FieldState
}

export function TextField({
  className,
  disabled = false,
  helperText,
  label,
  state = "default",
  ...props
}: TextFieldProps) {
  return (
    <FieldBase disabled={disabled} helperText={helperText} label={label} state={state}>
      <input
        className={cx(
          "type-body-l min-w-0 flex-1 bg-transparent text-[var(--kr-color-text-primary)] outline-none placeholder:text-[var(--kr-color-text-muted)] disabled:text-[var(--kr-color-text-muted)]",
          className,
        )}
        disabled={disabled}
        {...props}
      />
    </FieldBase>
  )
}
