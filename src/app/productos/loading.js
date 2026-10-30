export default function LoadingProductos() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
      <div className="mb-8 h-10 w-64 animate-pulse rounded bg-border" />
      <div className="mb-8 h-14 animate-pulse rounded-2xl bg-border" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="overflow-hidden rounded-3xl border border-border">
            <div className="aspect-[4/3] animate-pulse bg-border" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-1/3 animate-pulse rounded bg-border" />
              <div className="h-6 w-2/3 animate-pulse rounded bg-border" />
              <div className="h-5 w-1/2 animate-pulse rounded bg-border" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}