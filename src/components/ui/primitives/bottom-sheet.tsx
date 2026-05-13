import type { ReactNode } from "react"
import { Button } from "@/components/ui/primitives/button"
import { cx } from "@/lib/cx"

export type BottomSheetVariant = "action" | "selection" | "filters"

type BottomSheetProps = {
  children?: ReactNode
  className?: string
  description?: string
  dismissible?: boolean
  onClose?: () => void
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
  open?: boolean
  primaryActionLabel?: string
  secondaryActionLabel?: string
  title: string
  variant?: BottomSheetVariant
}

export function BottomSheet({
  children,
  className,
  description,
  dismissible = true,
  onClose,
  onPrimaryAction,
  onSecondaryAction,
  open = true,
  primaryActionLabel,
  secondaryActionLabel,
  title,
  variant = "action",
}: BottomSheetProps) {
  if (!open) {
    return null
  }

  return (
    <div
      className={cx("fixed inset-0 z-50 h-full w-full overflow-hidden", className)}
      onClick={() => {
        if (dismissible) {
          onClose?.()
        }
      }}
      role="presentation"
    >
      <div className="overlay-backdrop absolute inset-0" />

      <div
        aria-modal="true"
        className={cx(
          "shadow-kr-overlay absolute inset-x-0 bottom-0 flex w-full flex-col gap-[16px] overflow-hidden rounded-t-[28px] border-t border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-floating)] px-[20px] pb-[20px] pt-[12px]",
          variant === "action" ? "min-h-[280px]" : "",
        )}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="flex w-full justify-center">
          <span className="h-[5px] w-[44px] rounded-[999px] bg-[var(--kr-color-border-strong)]" />
        </div>

        <div className="flex flex-col gap-[8px]">
          <h2 className="type-title-m text-[var(--kr-color-text-primary)]">{title}</h2>
          {description ? (
            <p className="type-body-m text-[var(--kr-color-text-secondary)]">{description}</p>
          ) : null}
        </div>

        {children ? (
          <div className={cx("flex flex-col", variant === "filters" ? "gap-[14px]" : "gap-[12px]")}>
            {children}
          </div>
        ) : null}

        {primaryActionLabel || secondaryActionLabel ? (
          <div className="flex h-[50px] w-full items-center gap-[12px]">
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
