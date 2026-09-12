import { useEffect, useState } from "react"
import {
  ArrowLeft,
  Building2,
  CalendarCheck,
  Users,
  Wrench,
} from "lucide-react"
import { Link } from "react-router-dom"

import {
  resourceService,
  type Resource,
} from "../services/resourceService"

export default function Facilities() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadResources = async () => {
      try {
        setLoading(true)
        setError("")

        const data =
          await resourceService.getAvailableResources()

        setResources(data)
      } catch (err) {
        console.error("Resources loading error:", err)

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load facilities.",
        )
      } finally {
        setLoading(false)
      }
    }

    loadResources()
  }, [])

  const rooms = resources.filter(
    (resource) => resource.type === "room",
  )

  const equipment = resources.filter(
    (resource) => resource.type === "equipment",
  )

  const ResourceCard = ({
    resource,
  }: {
    resource: Resource
  }) => {
    const isRoom = resource.type === "room"

    return (
      <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md">
        <div className="mb-5 flex items-start justify-between">
          <div className="rounded-xl bg-slate-100 p-3">
            {isRoom ? (
              <Building2
                size={24}
                className="text-slate-700"
              />
            ) : (
              <Wrench
                size={24}
                className="text-slate-700"
              />
            )}
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium capitalize text-green-700">
            Available
          </span>
        </div>

        <h3 className="text-xl font-semibold text-slate-900">
          {resource.name}
        </h3>

        <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
          {resource.description ||
            "A Riverside Community Hub resource available for community use."}
        </p>

        {resource.capacity && (
          <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
            <Users size={17} />
            <span>
              Capacity: {resource.capacity} people
            </span>
          </div>
        )}

        <Link
          to="/login"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <CalendarCheck size={17} />
          Sign in to book
        </Link>
      </article>
    )
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
            Facilities & Equipment
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Explore the spaces and equipment available to Riverside
            members. Sign in or create an account to request a booking.
          </p>
        </header>

        {loading && (
          <div className="mt-12 rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
            <p className="text-slate-600">
              Loading available resources...
            </p>
          </div>
        )}

        {error && (
          <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            <p className="font-medium">
              Unable to load facilities
            </p>

            <p className="mt-1 text-sm">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && (
          <>
            <section className="mt-12">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Rooms & Facilities
                </h2>

                <p className="mt-1 text-slate-600">
                  Spaces available for meetings, events, training and
                  community activities.
                </p>
              </div>

              {rooms.length === 0 ? (
                <p className="rounded-xl bg-white p-6 text-slate-500">
                  No rooms are currently available.
                </p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rooms.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                    />
                  ))}
                </div>
              )}
            </section>

            <section className="mt-16">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Equipment
                </h2>

                <p className="mt-1 text-slate-600">
                  Equipment available to support community events and
                  programmes.
                </p>
              </div>

              {equipment.length === 0 ? (
                <p className="rounded-xl bg-white p-6 text-slate-500">
                  No equipment is currently available.
                </p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {equipment.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  )
}