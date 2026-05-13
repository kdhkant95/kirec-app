import type { HTMLAttributes } from "react"
import { cx } from "@/lib/cx"

export type FileUploadState = "empty" | "uploading" | "done" | "error"

type FileUploadProps = HTMLAttributes<HTMLDivElement> & {
  actionLabel?: string
  detail?: string
  onAction?: () => void
  progress?: number
  state?: FileUploadState
  title?: string
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M14.5 3.75H7.75A2.75 2.75 0 0 0 5 6.5v11A2.75 2.75 0 0 0 7.75 20.25h8.5A2.75 2.75 0 0 0 19 17.5V8.25L14.5 3.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M14.5 3.75v4.5H19" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 15V9.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="m9.75 11.75 2.25-2.25 2.25 2.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  )
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="m8.5 12 2.3 2.3 4.7-4.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  )
}

function getCopy(state: FileUploadState) {
  switch (state) {
    case "uploading":
      return {
        actionLabel: "Cancel",
        detail: "54% complete",
        title: "Uploading clip",
      }
    case "done":
      return {
        actionLabel: "Replace",
        detail: "184 MB · ready",
        title: "Uploaded",
      }
    case "error":
      return {
        actionLabel: "Retry",
        detail: "네트워크를 확인해주세요",
        title: "Upload failed",
      }
    default:
      return {
        actionLabel: "Browse",
        detail: "MP4, MOV up to 2GB",
        title: "Attach video",
      }
  }
}

export function FileUpload({
  actionLabel,
  className,
  detail,
  onAction,
  progress = 54,
  state = "empty",
  title,
  ...props
}: FileUploadProps) {
  const defaults = getCopy(state)
  const resolvedTitle = title ?? defaults.title
  const resolvedDetail = detail ?? defaults.detail
  const resolvedActionLabel = actionLabel ?? defaults.actionLabel
  const toneClass =
    state === "error"
      ? "border-[#ff7a57]"
      : "border-[var(--kr-color-border-subtle)]"
  const iconClass =
    state === "done"
      ? "text-[var(--kr-color-state-success)]"
      : state === "error"
        ? "text-[#ff7a57]"
        : "text-[var(--kr-color-text-secondary)]"
  const detailClass =
    state === "error" ? "text-[#ff7a57]" : "text-[var(--kr-color-text-secondary)]"
  const actionClass =
    state === "error" ? "text-[#ff7a57]" : "text-[var(--kr-color-text-secondary)]"

  return (
    <div className={cx("flex w-full flex-col items-start", state === "uploading" ? "gap-[10px]" : "", className)} {...props}>
      <div
        className={cx(
          "flex h-[72px] w-full items-center justify-between rounded-[16px] border bg-[var(--kr-color-bg-elevated)] px-[16px] py-[14px]",
          toneClass,
        )}
      >
        <div className="flex min-w-0 items-center gap-[12px]">
          <span aria-hidden="true" className={cx("inline-flex size-6 shrink-0 items-center justify-center", iconClass)}>
            {state === "done" ? <CheckCircleIcon className="size-5" /> : <UploadIcon className="size-5" />}
          </span>

          <div className="min-w-0">
            <p className="type-body-m truncate text-[var(--kr-color-text-primary)]">{resolvedTitle}</p>
            <p className={cx("type-label-s mt-[4px] truncate", detailClass)}>{resolvedDetail}</p>
          </div>
        </div>

        <button className={cx("type-label-s shrink-0 bg-transparent text-right", actionClass)} onClick={onAction} type="button">
          {resolvedActionLabel}
        </button>
      </div>

      {state === "uploading" ? (
        <div className="h-[26px] w-full overflow-hidden">
          <div className="h-[6px] w-full rounded-[3px] bg-[#23242b]">
            <div
              className="h-[6px] rounded-[3px] bg-[var(--kr-color-action-primary-bg)]"
              style={{ width: `${Math.max(0, Math.min(progress, 100))}%` }}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
