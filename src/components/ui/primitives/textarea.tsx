import type { TextareaHTMLAttributes } from "react"
import { FieldBase, type FieldState } from "@/components/ui/primitives/field-base"
import { cx } from "@/lib/cx"

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  helperText?: string
  label?: string
  state?: FieldState
}

export function Textarea({
  className,
  disabled = false,
  helperText,
  label,
  rows = 3,
  state = "default",
  ...props
}: TextareaProps) {
  return (
    <FieldBase disabled={disabled} helperText={helperText} label={label} state={state}>
      <textarea
        className={cx(
          "type-body-l min-h-[112px] w-full resize-none bg-transparent text-[var(--kr-color-text-primary)] outline-none placeholder:text-[var(--kr-color-text-muted)] disabled:text-[var(--kr-color-text-muted)]",
          className,
        )}
        disabled={disabled}
        rows={rows}
        {...props}
      />
    </FieldBase>
  )
}
