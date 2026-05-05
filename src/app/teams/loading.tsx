export default function TeamsLoading() {
  return (
    <div className="min-h-dvh px-4 py-8 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 w-20 skeleton-block rounded-lg" />
        <div className="h-6 w-16 skeleton-block rounded-lg" />
      </div>
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 w-full skeleton-block rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
