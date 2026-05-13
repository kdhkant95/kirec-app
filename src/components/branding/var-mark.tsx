import { cx } from "@/lib/cx"

type VarMarkProps = {
  className?: string
}

const layers = [
  "bg-[var(--kr-color-action-primary-bg)]",
  "bg-[var(--kr-color-accent-violet)]",
  "bg-[var(--kr-color-accent-cyan)]",
]

export function VarMark({ className }: VarMarkProps) {
  return (
    <div aria-hidden="true" className={cx("relative size-12", className)}>
      {layers.map((layerClassName, index) => (
        <span
          key={layerClassName}
          className={cx(
            "absolute left-[5px] h-[10px] w-[34px] rounded-full rotate-[12deg]",
            layerClassName,
          )}
          style={{ top: `${6 + index * 12}px` }}
        />
      ))}
    </div>
  )
}
