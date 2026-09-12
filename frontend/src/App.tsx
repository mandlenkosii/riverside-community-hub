/*
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

export default App */
/*
import { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"

type Resource = {
  id: string
  name: string
  type: "room" | "equipment"
  capacity: number | null
  description: string | null
  available: boolean
}

function App() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadResources() {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .order("name")

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      setResources(data ?? [])
      setLoading(false)
    }

    loadResources()
  }, [])

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-slate-900">
          Riverside Community Hub
        </h1>

        <p className="mt-2 text-slate-600">
          Supabase database connection test
        </p>

        {loading && (
          <p className="mt-8 text-slate-500">
            Loading resources...
          </p>
        )}

        {error && (
          <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-slate-900">
                    {resource.name}
                  </h2>

                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium capitalize text-emerald-700">
                    {resource.type}
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-600">
                  {resource.description}
                </p>

                {resource.capacity && (
                  <p className="mt-4 text-sm font-medium text-slate-700">
                    Capacity: {resource.capacity}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default App */
import { BrowserRouter } from "react-router-dom"

import AppRoutes from "./routes/AppRoutes"

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}