import { useEffect, useState } from "react";
import { CalendarDays, Users, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

import { resourceService, type Resource } from "../services/resourceService";

export default function Facilities() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadResources() {
      try {
        setLoading(true);
        setError("");

        const data = await resourceService.getAvailableResources();

        setResources(data);
      } catch (err) {
        console.error("Unable to load facilities:", err);
        setError(
          "We couldn't load the facilities right now. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadResources();
  }, []);

  const rooms = resources.filter((resource) => resource.type === "room");

  const equipment = resources.filter(
    (resource) => resource.type === "equipment",
  );

  return (
    <div className="bg-slate-50">
      {/* Page hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              Riverside Facilities
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Spaces and equipment for your community activities.
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Explore the rooms and equipment available at Riverside Community
              Hub. Members can request a booking directly through the platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/bookings"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md"
              >
                <CalendarDays size={18} />
                Make a booking
              </Link>

              <Link
                to="/programmes"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Explore programmes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="h-12 w-12 rounded-xl bg-slate-200" />

                <div className="mt-5 h-6 w-2/3 rounded bg-slate-200" />

                <div className="mt-3 h-4 w-full rounded bg-slate-200" />

                <div className="mt-2 h-4 w-5/6 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="font-semibold text-red-900">
              Unable to load facilities
            </h2>

            <p className="mt-2 text-sm text-red-700">{error}</p>
          </div>
        ) : resources.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <Wrench className="mx-auto text-slate-400" size={32} />

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              No facilities available
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              There are currently no available facilities or equipment to
              display.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Rooms */}
            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                    Spaces
                  </span>

                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                    Community rooms
                  </h2>

                  <p className="mt-3 max-w-2xl text-slate-600">
                    Flexible spaces for meetings, training sessions, community
                    events and activities.
                  </p>
                </div>

                <div className="hidden rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 sm:block">
                  {rooms.length} {rooms.length === 1 ? "room" : "rooms"}
                </div>
              </div>

              {rooms.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                  No rooms are currently available.
                </div>
              ) : (
                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rooms.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              )}
            </div>

            {/* Equipment */}
            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                    Equipment
                  </span>

                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                    Equipment
                  </h2>

                  <p className="mt-3 max-w-2xl text-slate-600">
                    Useful equipment available to support your community
                    activities and events.
                  </p>
                </div>

                <div className="hidden rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 sm:block">
                  {equipment.length} {equipment.length === 1 ? "item" : "items"}
                </div>
              </div>

              {equipment.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                  No equipment is currently available.
                </div>
              ) : (
                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {equipment.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Booking CTA */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-950 px-6 py-10 sm:px-10 md:flex md:items-center md:justify-between md:gap-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Ready to use a facility?
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white">
                Request your booking online.
              </h2>

              <p className="mt-4 leading-7 text-slate-400">
                Sign in to your Riverside account to request a room or equipment
                and keep track of your booking status.
              </p>
            </div>

            <Link
              to="/bookings"
              className="mt-7 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700 md:mt-0"
            >
              <CalendarDays size={18} />
              Book a facility
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
          {resource.type === "room" ? (
            <Users size={23} />
          ) : (
            <Wrench size={23} />
          )}
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
          Available
        </span>
      </div>

      <h3 className="mt-6 text-xl font-bold text-slate-900">{resource.name}</h3>

      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
        {resource.description ||
          (resource.type === "room"
            ? "A flexible community space available for Riverside activities and events."
            : "Equipment available for Riverside community activities and events.")}
      </p>

      {resource.capacity !== null && resource.capacity > 0 && (
        <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-5 text-sm text-slate-600">
          <Users size={17} className="text-slate-400" />

          <span>
            Capacity:{" "}
            <strong className="font-semibold text-slate-900">
              {resource.capacity} people
            </strong>
          </span>
        </div>
      )}

      <Link
        to="/bookings"
        className="mt-5 inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
      >
        Request booking
      </Link>
    </article>
  );
}
