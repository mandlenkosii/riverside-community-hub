function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Riverside Community Hub
            </h1>
            <p className="text-sm text-slate-500">
              Membership, bookings & donations
            </p>
          </div>

          <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
            Development
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Riverside Community Hub
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Connecting our community through one platform.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            A full-stack platform for community membership, facility bookings,
            programmes and donations.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-sm font-medium text-slate-900">
                Membership
              </p>
              <p className="text-xs text-slate-500">
                Coming in the next stage
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-sm font-medium text-slate-900">
                Bookings
              </p>
              <p className="text-xs text-slate-500">
                Coming in the next stage
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-sm font-medium text-slate-900">
                Donations
              </p>
              <p className="text-xs text-slate-500">
                Coming in the next stage
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App