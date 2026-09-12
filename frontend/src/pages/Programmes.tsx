import { useEffect, useState } from "react"
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  GraduationCap,
  HeartHandshake,
  Dumbbell,
  Users,
} from "lucide-react"
import { Link } from "react-router-dom"

import {
  programmeService,
  type Programme,
} from "../services/programmeService"

export default function Programmes() {
  const [programmes, setProgrammes] = useState<Programme[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadProgrammes = async () => {
      try {
        setLoading(true)
        setError("")

        const data =
          await programmeService.getActiveProgrammes()

        setProgrammes(data)
      } catch (err) {
        console.error("Programmes loading error:", err)

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load programmes.",
        )
      } finally {
        setLoading(false)
      }
    }

    loadProgrammes()
  }, [])

  const getIcon = (category: string | null) => {
    const value = category?.toLowerCase() ?? ""

    if (
      value.includes("fitness") ||
      value.includes("sport")
    ) {
      return Dumbbell
    }

    if (
      value.includes("youth") ||
      value.includes("education") ||
      value.includes("skills")
    ) {
      return GraduationCap
    }

    if (
      value.includes("support") ||
      value.includes("community")
    ) {
      return HeartHandshake
    }

    return Users
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to Riverside
        </Link>

        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Riverside Community Hub
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Community Programmes
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Discover programmes designed to support learning, health,
            development and stronger community connections.
          </p>
        </header>

        {loading && (
          <div className="mt-12 rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
            <p className="text-slate-600">
              Loading community programmes...
            </p>
          </div>
        )}

        {error && (
          <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            <p className="font-medium">
              Unable to load programmes
            </p>

            <p className="mt-1 text-sm">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && (
          <section className="mt-12">
            {programmes.length === 0 ? (
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
                <p className="text-slate-600">
                  No active programmes are currently available.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {programmes.map((programme) => {
                  const Icon = getIcon(programme.category)

                  return (
                    <article
                      key={programme.id}
                      className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
                    >
                      {programme.image_url ? (
                        <img
                          src={programme.image_url}
                          alt={programme.title}
                          className="h-52 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-52 items-center justify-center bg-slate-100">
                          <Icon
                            size={52}
                            className="text-slate-400"
                          />
                        </div>
                      )}

                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            {programme.category && (
                              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                {programme.category}
                              </span>
                            )}

                            <h2 className="mt-2 text-2xl font-bold text-slate-900">
                              {programme.title}
                            </h2>
                          </div>

                          <div className="rounded-xl bg-slate-100 p-3">
                            <Icon
                              size={22}
                              className="text-slate-700"
                            />
                          </div>
                        </div>

                        <p className="mt-4 leading-7 text-slate-600">
                          {programme.description ||
                            "A Riverside Community Hub programme created to support our local community."}
                        </p>

                        {programme.schedule && (
                          <div className="mt-6 flex items-start gap-3 border-t border-slate-100 pt-5">
                            <CalendarDays
                              size={19}
                              className="mt-0.5 shrink-0 text-slate-500"
                            />

                            <div>
                              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                Schedule
                              </p>

                              <p className="mt-1 text-sm text-slate-700">
                                {programme.schedule}
                              </p>
                            </div>
                          </div>
                        )}

                        {!programme.schedule && (
                          <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5 text-sm text-slate-500">
                            <Clock size={18} />
                            Schedule information coming soon.
                          </div>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </section>
        )}

        <section className="mt-16 rounded-2xl bg-slate-900 px-6 py-10 text-white sm:px-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold">
              Become part of Riverside
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Create a free Riverside account to access bookings,
              manage your membership and stay connected with community
              activities.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Join Riverside
              </Link>

              <Link
                to="/login"
                className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}