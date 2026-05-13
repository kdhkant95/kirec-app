import type { HTMLAttributes } from "react"
import { cx } from "@/lib/cx"

type ToastKind = "toast" | "snackbar"
type ToastTone = "info" | "success" | "warning" | "danger" | "neutral"

type ToastSnackbarProps = HTMLAttributes<HTMLDivElement> & {
  actionLabel?: string
  description?: string
  kind?: ToastKind
  onAction?: () => void
  onClose?: () => void
  title: string
  tone?: ToastTone
}

const toneClasses: Record<ToastTone, { accent: string; title: string }> = {
  info: {
    accent: "bg-[var(--kr-color-text-primary)]",
    title: "text-[var(--kr-color-text-primary)]",
  },
  success: {
    accent: "bg-[var(--kr-color-state-success)]",
    title: "text-[var(--kr-color-state-success)]",
  },
  warning: {
    accent: "bg-[var(--kr-color-state-warning)]",
    title: "text-[var(--kr-color-state-warning)]",
  },
  danger: {
    accent: "bg-[var(--kr-color-state-danger)]",
    title: "text-[var(--kr-color-state-danger)]",
  },
  neutral: {
    accent: "bg-[var(--kr-color-border-strong)]",
    title: "text-[var(--kr-color-text-primary)]",
  },
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8v4.25" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <circle cx="10" cy="6" r=".9" fill="currentColor" />
    </svg>
  )
}

function SuccessIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="m6.75 10 2.2 2.2 4.3-4.35" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  )
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <path d="M10 3.5 16 14a1.1 1.1 0 0 1-.95 1.65H4.95A1.1 1.1 0 0 1 4 14L10 3.5Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 7.5v3.75" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <circle cx="10" cy="13.25" r=".9" fill="currentColor" />
    </svg>
  )
}

function DangerIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <path d="M10 3.5 16 14a1.1 1.1 0 0 1-.95 1.65H4.95A1.1 1.1 0 0 1 4 14L10 3.5Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 7.5v3.75" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <circle cx="10" cy="13.25" r=".9" fill="currentColor" />
    </svg>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="m7.25 7.25 5.5 5.5m0-5.5-5.5 5.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  )
}

function renderToneIcon(tone: ToastTone, className?: string) {
  switch (tone) {
    case "success":
      return <SuccessIcon className={className} />
    case "warning":
      return <WarningIcon className={className} />
    case "danger":
      return <DangerIcon className={className} />
    default:
      return <InfoIcon className={className} />
  }
}

export function ToastSnackbar({
  actionLabel,
  className,
  description,
  kind = "toast",
  onAction,
  onClose,
  title,
  tone = "neutral",
  ...props
}: ToastSnackbarProps) {
  const toneStyle = toneClasses[tone]

  return (
    <div
      className={cx(
        "shadow-kr-low flex w-full max-w-[343px] items-center gap-[12px] rounded-[18px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-floating)]",
        kind === "toast" ? "px-[16px] py-[14px]" : "px-[16px] py-[12px]",
        className,
      )}
      {...props}
    >
      {kind === "toast" ? (
        <>
          <span className={cx("h-[38px] w-[3px] rounded-[999px]", toneStyle.accent)} />
          {renderToneIcon(tone, cx("size-5 shrink-0", toneStyle.title))}
        </>
      ) : null}

      <div className="min-w-0 flex-1">
        <p className={cx("type-body-l", kind === "toast" ? toneStyle.title : "text-[var(--kr-color-text-primary)]")}>
          {title}
        </p>
        {description ? (
          <p className="type-label-m mt-[4px] text-[var(--kr-color-text-secondary)]">{description}</p>
        ) : null}
      </div>

      {(actionLabel || onClose) && kind === "snackbar" ? (
        <div className="flex shrink-0 items-center gap-[12px]">
          {actionLabel ? (
            <button className="type-label-m bg-transparent text-[var(--kr-color-text-primary)]" onClick={onAction} type="button">
              {actionLabel}
            </button>
          ) : null}
          {onClose ? (
            <button
              aria-label="닫기"
              className="inline-flex size-5 items-center justify-center bg-transparent text-[var(--kr-color-text-primary)]"
              onClick={onClose}
              type="button"
            >
              <CloseIcon className="size-5" />
            </button>
          ) : null}
        </div>
      ) : kind === "toast" && onClose ? (
        <button
          aria-label="닫기"
          className="inline-flex size-5 shrink-0 items-center justify-center bg-transparent text-[var(--kr-color-text-primary)]"
          onClick={onClose}
          type="button"
        >
          <CloseIcon className="size-5" />
        </button>
      ) : null}
    </div>
  )
}
