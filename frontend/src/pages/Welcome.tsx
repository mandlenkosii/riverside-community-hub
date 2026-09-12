import { Link } from "react-router-dom"
import {
  CalendarDays,
  Heart,
  Users,
  Dumbbell,
  ArrowRight,
} from "lucide-react"

const features = [
  {
    icon: CalendarDays,
    title: "Book Facilities",
    description:
      "Reserve community rooms and equipment for your next activity or event.",
  },
  {
    icon: Users,
    title: "Community Programmes",
    description:
      "Discover programmes designed to support learning, health and community development.",
  },
  {
    icon: Heart,
    title: "Support Our Community",
    description:
      "Contribute to campaigns that help families and individuals in our community.",
  },
  {
    icon: Dumbbell,
    title: "Stay Active",
    description:
      "Access community fitness facilities and programmes designed for all ages.",
  },
]

export default function Welcome() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold">Riverside Community Hub</h1>
            <p className="text-sm text-slate-500">
              Connecting people. Building community.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Sign in
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Join Riverside
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            Welcome to Riverside
          </span>

          <h2 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
            One place for your community activities.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Riverside Community Hub brings memberships, facility bookings,
            community programmes and donations together in one simple platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Become a member
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/login"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
            >
              Member sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10">
            <h3 className="text-3xl font-bold">
              Everything your community needs
            </h3>

            <p className="mt-2 text-slate-600">
              A simple platform for connecting members with Riverside's
              services.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Icon size={24} />
                  </div>

                  <h4 className="text-lg font-semibold">
                    {feature.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl bg-blue-600 px-8 py-12 text-white md:px-12">
          <h3 className="text-3xl font-bold">
            Ready to get involved?
          </h3>

          <p className="mt-3 max-w-2xl text-blue-100">
            Create your Riverside account to manage your membership, book
            facilities and take part in our community programmes.
          </p>

          <Link
            to="/register"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-blue-700 hover:bg-blue-50"
          >
            Create an account
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  )
}