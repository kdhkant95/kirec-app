import type { ButtonHTMLAttributes, ReactNode, SVGProps } from "react"
import { cx } from "@/lib/cx"

type TopAppBarActionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode
  label: string
}

type TopAppBarProps = {
  actions?: TopAppBarActionProps[]
  className?: string
  onBackClick?: () => void
  showBackButton?: boolean
  title: string
}

function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        d="M9.57 5.93 3.5 12l6.07 6.07"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M20.5 12H3.67"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function TopAppBarAction({ className, icon, label, type = "button", ...props }: TopAppBarActionProps) {
  return (
    <button
      aria-label={label}
      className={cx(
        "focus-ring inline-flex size-10 items-center justify-center rounded-[20px] text-[var(--kr-color-text-primary)] transition-colors duration-150",
        className,
      )}
      type={type}
      {...props}
    >
      <span aria-hidden="true" className="inline-flex size-5 items-center justify-center [&_svg]:size-full">
        {icon}
      </span>
    </button>
  )
}

export function TopAppBar({
  actions = [],
  className,
  onBackClick,
  showBackButton = false,
  title,
}: TopAppBarProps) {
  return (
    <div
      className={cx(
        "flex h-[72px] w-full items-center justify-between rounded-[20px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-canvas)] p-[var(--kr-space-16)]",
        className,
      )}
    >
      <div className={cx("flex min-w-0 items-center", showBackButton && "gap-[12px]")}>
        {showBackButton ? (
          <TopAppBarAction icon={<ArrowLeftIcon />} label="뒤로 가기" onClick={onBackClick} />
        ) : null}
        <h2 className="truncate text-[20px] font-bold leading-[26px] text-[var(--kr-color-text-primary)]">
          {title}
        </h2>
      </div>

      {actions.length > 0 ? (
        <div className={cx("flex items-center", actions.length > 1 && "gap-[var(--kr-space-8)]")}>
          {actions.slice(0, 2).map(({ icon, label, ...actionProps }) => (
            <TopAppBarAction key={label} icon={icon} label={label} {...actionProps} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
