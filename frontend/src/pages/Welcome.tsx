import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Dumbbell,
  Heart,
  Users,
} from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Book Facilities",
    description:
      "Reserve community rooms and equipment for activities, meetings, training and events.",
    link: "/facilities",
    linkText: "Explore facilities",
  },
  {
    icon: Users,
    title: "Community Programmes",
    description:
      "Discover programmes focused on learning, health, youth development and community support.",
    link: "/programmes",
    linkText: "View programmes",
  },
  {
    icon: Heart,
    title: "Support Our Community",
    description:
      "Support Riverside campaigns that help provide meaningful assistance to people and families.",
    link: "/donations",
    linkText: "Support a campaign",
  },
  {
    icon: Dumbbell,
    title: "Stay Active",
    description:
      "Take part in fitness activities and make use of spaces designed to support an active lifestyle.",
    link: "/programmes",
    linkText: "Find activities",
  },
];

const benefits = [
  "Simple online membership",
  "Easy facility booking",
  "Community programmes",
  "Transparent donation campaigns",
];

export default function Welcome() {
  return (
    <div className="bg-slate-50 text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Hero content */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Welcome to Riverside
              </span>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                One place to connect, participate and make a difference.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Riverside Community Hub brings memberships, facility bookings,
                community programmes and donations together in one simple
                platform.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
                >
                  Become a member
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/facilities"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
                >
                  Explore Riverside
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <CheckCircle2 size={17} className="text-emerald-600" />

                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-xl shadow-slate-200/60">
                <div className="rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-400">
                        Riverside Community Hub
                      </p>

                      <h2 className="mt-2 text-2xl font-bold">
                        Your community,
                        <br />
                        all in one place.
                      </h2>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600">
                      <Heart size={24} />
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3">
                    <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
                          <CalendarDays size={20} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold">
                            Facility bookings
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Request rooms and equipment online
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">
                          <Users size={20} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold">
                            Community programmes
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Learn, connect and participate
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 text-red-300">
                          <Heart size={20} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold">
                            Support local initiatives
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Contribute to active campaigns
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-lg sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Heart size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Stronger together
                    </p>

                    <p className="text-xs text-slate-500">
                      Built for the community
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              What you can do
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Everything you need to get involved.
            </h2>

            <p className="mt-4 text-lg leading-7 text-slate-600">
              Whether you want to use a facility, join a programme or support a
              local initiative, Riverside gives you one place to manage it.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>

                  <Link
                    to={feature.link}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                  >
                    {feature.linkText}
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community section */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                Built around people
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                A simpler way to stay connected to your community.
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-600">
                Riverside brings the services of the community hub together in
                one place. Members can manage their account, request facilities,
                follow programmes and support campaigns without relying on
                disconnected processes.
              </p>

              <div className="mt-8">
                <Link
                  to="/programmes"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Discover our programmes
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Users size={22} />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">Membership</h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Keep your Riverside membership and profile information
                  organised in one place.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <CalendarDays size={22} />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">Facilities</h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Request community rooms and equipment and track your booking
                  status.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <Dumbbell size={22} />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">Activities</h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Find programmes and activities that support learning, health
                  and development.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <Heart size={22} />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">Giving</h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Follow community campaigns and contribute directly to causes
                  that matter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Get involved
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to become part of Riverside?
              </h2>

              <p className="mt-4 leading-7 text-slate-400">
                Create your account and start exploring the facilities,
                programmes and community initiatives available through
                Riverside.
              </p>
            </div>

            <Link
              to="/register"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Join Riverside
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
