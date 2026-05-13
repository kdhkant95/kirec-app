import type { ReactNode } from "react"
import {
  AppReviewIcon,
  AppSettingsIcon,
  AppStatsIcon,
  AppTeamIcon,
} from "@/components/ui/icons/var-icons"
import { cx } from "@/lib/cx"

type DefaultBottomNavigationValue = "review" | "stats" | "team" | "settings"

export type BottomNavigationItem<T extends string = DefaultBottomNavigationValue> = {
  activeIcon?: ReactNode
  icon?: ReactNode
  label: string
  value: T
}

type BottomNavigationProps<T extends string = DefaultBottomNavigationValue> = {
  active: T
  className?: string
  items?: BottomNavigationItem<T>[]
  onValueChange?: (value: T) => void
}

const defaultItems: BottomNavigationItem<DefaultBottomNavigationValue>[] = [
  { label: "리뷰", value: "review" },
  { label: "통계", value: "stats" },
  { label: "팀", value: "team" },
  { label: "설정", value: "settings" },
]

function getDefaultIcon(value: DefaultBottomNavigationValue, active: boolean) {
  switch (value) {
    case "stats":
      return <AppStatsIcon active={active} className="size-5" />
    case "team":
      return <AppTeamIcon active={active} className="size-5" />
    case "settings":
      return <AppSettingsIcon active={active} className="size-5" />
    default:
      return <AppReviewIcon active={active} className="size-5" />
  }
}

export function BottomNavigation<T extends string = DefaultBottomNavigationValue>({
  active,
  className,
  items,
  onValueChange,
}: BottomNavigationProps<T>) {
  const resolvedItems = (items ?? defaultItems) as BottomNavigationItem<T>[]

  return (
    <nav
      className={cx(
        "flex h-[88px] w-full items-center justify-between rounded-[24px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-floating)] px-[12px] pb-[16px] pt-[12px]",
        className,
      )}
    >
      {resolvedItems.map((item) => {
        const isActive = item.value === active
        const icon =
          item.activeIcon && isActive
            ? item.activeIcon
            : item.icon
              ? item.icon
              : getDefaultIcon(item.value as DefaultBottomNavigationValue, isActive)

        return (
          <button
            className={cx(
              "flex min-w-0 flex-1 flex-col items-center justify-center gap-[6px] px-[6px]",
              isActive ? "text-[var(--kr-color-text-primary)]" : "text-[var(--kr-color-text-muted)]",
            )}
            key={item.value}
            onClick={() => onValueChange?.(item.value)}
            type="button"
          >
            <span aria-hidden="true" className="inline-flex size-6 items-center justify-center">
              {icon}
            </span>
            <span className={cx("text-[12px] leading-[16px]", isActive ? "font-medium" : "font-normal")}>
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
