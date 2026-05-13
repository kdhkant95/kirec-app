import type { ReactNode } from "react"
import { Button } from "@/components/ui/primitives/button"
import { cx } from "@/lib/cx"

export type ModalDialogVariant = "info" | "danger" | "form"

type ModalDialogProps = {
  children?: ReactNode
  className?: string
  description?: string
  dismissible?: boolean
  eyebrow?: string
  onClose?: () => void
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
  open?: boolean
  primaryActionLabel?: string
  secondaryActionLabel?: string
  title: string
  variant?: ModalDialogVariant
}

const variantLayoutClasses = {
  info: "items-center justify-center px-[12px]",
  danger: "items-center justify-center px-[12px]",
  form: "items-start justify-center px-[12px] pt-[74px]",
} as const

export function ModalDialog({
  children,
  className,
  description,
  dismissible = true,
  eyebrow,
  onClose,
  onPrimaryAction,
  onSecondaryAction,
  open = true,
  primaryActionLabel,
  secondaryActionLabel,
  title,
  variant = "info",
}: ModalDialogProps) {
  if (!open) {
    return null
  }

  return (
    <div
      className={cx(
        "overlay-backdrop fixed inset-0 z-50 flex w-full",
        variantLayoutClasses[variant],
        className,
      )}
      onClick={() => {
        if (dismissible) {
          onClose?.()
        }
      }}
      role="presentation"
    >
      <div
        aria-modal="true"
        className="flex w-full max-w-[352px] flex-col gap-[16px] overflow-hidden rounded-[24px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-selected)] px-[16px] pb-[16px] pt-[18px]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        {eyebrow ? (
          <p className="type-label-s text-[var(--kr-color-state-warning)]">{eyebrow}</p>
        ) : null}

        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <h2 className="type-title-m text-[var(--kr-color-text-primary)]">{title}</h2>
            {description ? (
              <p className="type-body-m text-[var(--kr-color-text-secondary)]">{description}</p>
            ) : null}
          </div>

          {children ? <div className="flex flex-col gap-[12px]">{children}</div> : null}
        </div>

        {primaryActionLabel || secondaryActionLabel ? (
          <div className={cx("flex h-[50px] w-full items-center gap-[12px]", secondaryActionLabel ? "" : "justify-end")}>
            {secondaryActionLabel ? (
              <Button
                className="w-full flex-1"
                onClick={onSecondaryAction}
                size="l"
                tone="secondary"
              >
                {secondaryActionLabel}
              </Button>
            ) : null}

            {primaryActionLabel ? (
              <Button
                className={cx("w-full", secondaryActionLabel ? "flex-1" : "")}
                onClick={onPrimaryAction}
                size="l"
                tone="primary"
              >
                {primaryActionLabel}
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}
