export default function TeamLoading() {
  return (
    <div className="min-h-dvh px-4 py-8 max-w-lg mx-auto">
      <div className="h-6 w-24 skeleton-block rounded-lg mb-8" />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 w-full skeleton-block rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
