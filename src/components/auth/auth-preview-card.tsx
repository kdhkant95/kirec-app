import { Card } from "@/components/ui/primitives/card"
import { cx } from "@/lib/cx"

type AuthPreviewCardProps = {
  className?: string
}

function PreviewInfo({
  accentClassName,
  children,
}: {
  accentClassName: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-[var(--kr-space-8)]">
      <span className={cx("mt-[5px] size-[10px] shrink-0 rounded-full", accentClassName)} />
      <p className="type-body-m text-[var(--kr-color-text-primary)]">{children}</p>
    </div>
  )
}

export function AuthPreviewCard({ className }: AuthPreviewCardProps) {
  return (
    <Card
      className={cx(
        "gap-[18px] rounded-[26px] px-[18px] py-[18px]",
        className,
      )}
    >
      <div className="rounded-[20px] bg-[var(--kr-color-bg-elevated)] px-[16px] py-[16px]">
        <div className="relative h-[76px] rounded-[18px] border border-[var(--kr-color-border-strong)]">
          <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[var(--kr-color-border-strong)]" />
          <span className="absolute left-1/2 top-1/2 size-[34px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--kr-color-border-strong)]" />
          <span className="absolute bottom-[2px] left-[4px] h-[22px] w-[56px] rounded-full bg-[var(--kr-color-accent-brand)]" />
          <span className="absolute right-[4px] top-[4px] h-[22px] w-[68px] rounded-full bg-[var(--kr-color-state-success)]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[var(--kr-space-16)]">
        <PreviewInfo accentClassName="bg-[var(--kr-color-accent-brand)]">
          타임스탬프 댓글로 장면별 회고
        </PreviewInfo>
        <PreviewInfo accentClassName="bg-[var(--kr-color-state-success)]">
          골 · 어시스트 · 선방 경기별 성과 기록
        </PreviewInfo>
      </div>
    </Card>
  )
}
