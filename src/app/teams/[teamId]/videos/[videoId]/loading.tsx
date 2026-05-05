export default function VideoLoading() {
  return (
    <div className="min-h-dvh flex flex-col max-w-lg mx-auto">
      <div className="px-4 py-4 flex items-center justify-between border-b border-[var(--kr-color-border-subtle)]">
        <div className="h-5 w-12 skeleton-block rounded-lg" />
        <div className="h-4 w-8 skeleton-block rounded-lg" />
      </div>
      <div className="w-full skeleton-block" style={{ aspectRatio: "16/9" }} />
      <div className="px-4 py-4 space-y-3">
        <div className="h-4 w-48 skeleton-block rounded-lg" />
        <div className="h-4 w-64 skeleton-block rounded-lg" />
        <div className="h-4 w-40 skeleton-block rounded-lg" />
      </div>
    </div>
  )
}
