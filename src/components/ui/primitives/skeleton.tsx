import type { HTMLAttributes } from "react"
import { cx } from "@/lib/cx"

export type SkeletonVariant = "line" | "listItem" | "matchCard" | "detail"

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  variant?: SkeletonVariant
}

function Block({ className }: { className?: string }) {
  return <div className={cx("skeleton-block rounded-[999px]", className)} />
}

export function Skeleton({
  className,
  variant = "line",
  ...props
}: SkeletonProps) {
  if (variant === "line") {
    return (
      <div className={cx("flex w-full max-w-[320px] flex-col gap-[10px]", className)} {...props}>
        <Block className="h-[16px] w-[240px]" />
        <Block className="h-[16px] w-[300px]" />
        <Block className="h-[16px] w-[184px]" />
      </div>
    )
  }

  if (variant === "listItem") {
    return (
      <div
        className={cx(
          "shadow-kr-low flex h-[88px] w-full max-w-[343px] items-center gap-[14px] rounded-[18px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-surface)] px-[16px] py-[14px]",
          className,
        )}
        {...props}
      >
        <div className="skeleton-block size-[40px] rounded-full" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-[8px]">
            <Block className="h-[16px] w-[172px]" />
            <Block className="h-[12px] w-[128px]" />
          </div>
        </div>
        <Block className="h-[12px] w-[52px]" />
      </div>
    )
  }

  if (variant === "matchCard") {
    return (
      <div
        className={cx(
          "shadow-kr-low flex h-[220px] w-full max-w-[343px] flex-col gap-[14px] rounded-[22px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-surface)] p-[18px]",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-[12px]">
          <Block className="h-[18px] w-[132px]" />
          <div className="flex-1" />
          <Block className="h-[14px] w-[74px]" />
        </div>
        <div className="skeleton-block h-[88px] rounded-[16px]" />
        <div className="flex flex-col gap-[10px]">
          <Block className="h-[16px] w-[196px]" />
          <Block className="h-[12px] w-[252px]" />
          <div className="flex gap-[8px]">
            <Block className="h-[28px] w-[76px]" />
            <Block className="h-[28px] w-[92px]" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cx(
        "shadow-kr-low flex h-[288px] w-full max-w-[343px] flex-col gap-[14px] rounded-[22px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-surface)] p-[18px]",
        className,
      )}
      {...props}
    >
      <div className="skeleton-block h-[132px] rounded-[16px]" />
      <Block className="h-[16px] w-[208px]" />
      <Block className="h-[12px] w-[276px]" />
      <div className="flex items-center gap-[10px]">
        <div className="skeleton-block size-[28px] rounded-full" />
        <div className="flex flex-col gap-[8px]">
          <Block className="h-[12px] w-[154px]" />
          <Block className="h-[12px] w-[226px]" />
        </div>
      </div>
    </div>
  )
}
