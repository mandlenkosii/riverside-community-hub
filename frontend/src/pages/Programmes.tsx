import { useEffect, useState } from "react";
import { CalendarDays, Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";

import { programmeService, type Programme } from "../services/programmeService";

export default function Programmes() {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProgrammes() {
      try {
        setLoading(true);
        setError("");

        const data = await programmeService.getActiveProgrammes();

        setProgrammes(data);
      } catch (err) {
        console.error("Unable to load programmes:", err);

        setError(
          "We couldn't load the programmes right now. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadProgrammes();
  }, []);

  return (
    <div className="bg-slate-50">
      {/* Page hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              Riverside Programmes
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Programmes that help our community grow.
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Discover the programmes available at Riverside Community Hub and
              find opportunities to learn, stay active, build skills and support
              your community.
            </p>
          </div>
        </div>
      </section>

      {/* Programme content */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="h-12 w-12 rounded-xl bg-slate-200" />

                <div className="mt-6 h-6 w-3/4 rounded bg-slate-200" />

                <div className="mt-3 h-4 w-full rounded bg-slate-200" />

                <div className="mt-2 h-4 w-5/6 rounded bg-slate-200" />

                <div className="mt-6 h-4 w-1/2 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="font-semibold text-red-900">
              Unable to load programmes
            </h2>

            <p className="mt-2 text-sm text-red-700">{error}</p>
          </div>
        ) : programmes.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <Users className="mx-auto text-slate-400" size={34} />

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              No programmes available
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              There are currently no active programmes to display.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                  Get involved
                </span>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                  Our community programmes
                </h2>

                <p className="mt-3 max-w-2xl text-slate-600">
                  There is something for different ages, interests and community
                  needs.
                </p>
              </div>

              <div className="w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                {programmes.length}{" "}
                {programmes.length === 1 ? "programme" : "programmes"}
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programmes.map((programme) => (
                <ProgrammeCard key={programme.id} programme={programme} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Community CTA */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 sm:px-10 md:flex md:items-center md:justify-between md:gap-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Be part of Riverside
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white">
                Get involved with your community.
              </h2>

              <p className="mt-4 leading-7 text-slate-400">
                Become a Riverside member to access facilities, request bookings
                and stay connected with our programmes.
              </p>
            </div>

            <Link
              to="/register"
              className="mt-7 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700 md:mt-0"
            >
              <Heart size={18} />
              Join Riverside
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProgrammeCard({ programme }: { programme: Programme }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* Programme visual */}
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-emerald-50">
        {programme.image_url ? (
          <img
            src={programme.image_url}
            alt={programme.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
            <Users size={34} />
          </div>
        )}

        {programme.category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
            {programme.category}
          </span>
        )}
      </div>

      {/* Programme details */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-slate-900">{programme.title}</h3>

        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
          {programme.description ||
            "A community programme designed to create opportunities for learning, participation and personal development."}
        </p>

        {programme.schedule && (
          <div className="mt-6 flex items-start gap-3 border-t border-slate-100 pt-5">
            <CalendarDays
              size={18}
              className="mt-0.5 shrink-0 text-emerald-600"
            />

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Schedule
              </p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {programme.schedule}
              </p>
            </div>
          </div>
        )}

        <Link
          to="/register"
          className="mt-6 inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
        >
          Become a member
        </Link>
      </div>
    </article>
  );
}
