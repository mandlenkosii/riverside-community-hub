import { useEffect, useMemo, useState } from "react"
import { CalendarDays, Clock, Loader2, XCircle } from "lucide-react"

import { bookingService, type Booking } from "../services/bookingService"
import {
  resourceService,
  type Resource,
} from "../services/resourceService"

function formatDateTime(value: string) {
  return new Date(value).toLocaleString()
}

function getStatusClasses(status: Booking["status"]) {
  switch (status) {
    case "approved":
      return "bg-emerald-100 text-emerald-700"
    case "rejected":
      return "bg-red-100 text-red-700"
    case "cancelled":
      return "bg-slate-100 text-slate-600"
    default:
      return "bg-amber-100 text-amber-700"
  }
}

export default function Bookings() {
  const [resources, setResources] = useState<Resource[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])

  const [resourceId, setResourceId] = useState("")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endDate, setEndDate] = useState("")
  const [endTime, setEndTime] = useState("")
  const [notes, setNotes] = useState("")

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [cancellingId, setCancellingId] = useState<string | null>(
    null,
  )

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const rooms = useMemo(
    () => resources.filter((resource) => resource.type === "room"),
    [resources],
  )

  const equipment = useMemo(
    () =>
      resources.filter(
        (resource) => resource.type === "equipment",
      ),
    [resources],
  )

  const loadData = async () => {
    try {
      setLoading(true)
      setError("")

      const [resourceData, bookingData] = await Promise.all([
        resourceService.getAvailableResources(),
        bookingService.getMyBookings(),
      ])

      setResources(resourceData)
      setBookings(bookingData)
    } catch (err) {
      console.error("Booking page load error:", err)

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load booking information.",
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    if (!resourceId) {
      setError("Please select a facility or piece of equipment.")
      return
    }

    if (!startDate || !startTime || !endDate || !endTime) {
      setError("Please provide both start and end date/time.")
      return
    }

    const start = new Date(`${startDate}T${startTime}`)
    const end = new Date(`${endDate}T${endTime}`)

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      setError("Please enter valid dates and times.")
      return
    }

    if (end <= start) {
      setError("The end time must be after the start time.")
      return
    }

    if (start <= new Date()) {
      setError("Bookings must start in the future.")
      return
    }

    try {
      setSubmitting(true)

      await bookingService.createBooking({
        resource_id: resourceId,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        notes,
      })

      setSuccess(
        "Your booking request has been submitted and is awaiting staff approval.",
      )

      setResourceId("")
      setStartDate("")
      setStartTime("")
      setEndDate("")
      setEndTime("")
      setNotes("")

      const updatedBookings =
        await bookingService.getMyBookings()

      setBookings(updatedBookings)
    } catch (err) {
      console.error("Booking submission error:", err)

      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit your booking.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = async (bookingId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?",
    )

    if (!confirmed) {
      return
    }

    try {
      setCancellingId(bookingId)
      setError("")
      setSuccess("")

      await bookingService.cancelBooking(bookingId)

      setSuccess("Your booking has been cancelled.")

      const updatedBookings =
        await bookingService.getMyBookings()

      setBookings(updatedBookings)
    } catch (err) {
      console.error("Booking cancellation error:", err)

      setError(
        err instanceof Error
          ? err.message
          : "Unable to cancel your booking.",
      )
    } finally {
      setCancellingId(null)
    }
  }

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2 className="animate-spin" size={20} />
          Loading your bookings...
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-600">
          Member bookings
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Book a facility
        </h1>

        <p className="mt-3 max-w-2xl text-slate-600">
          Request a room or piece of equipment for your
          community activities. All bookings are reviewed by
          Riverside staff before they are approved.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              New booking request
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose your resource and preferred time.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="resource"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Facility or equipment
              </label>

              <select
                id="resource"
                value={resourceId}
                onChange={(event) =>
                  setResourceId(event.target.value)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="">
                  Select a resource
                </option>

                {rooms.length > 0 && (
                  <optgroup label="Rooms">
                    {rooms.map((resource) => (
                      <option
                        key={resource.id}
                        value={resource.id}
                      >
                        {resource.name}
                        {resource.capacity
                          ? ` — up to ${resource.capacity} people`
                          : ""}
                      </option>
                    ))}
                  </optgroup>
                )}

                {equipment.length > 0 && (
                  <optgroup label="Equipment">
                    {equipment.map((resource) => (
                      <option
                        key={resource.id}
                        value={resource.id}
                      >
                        {resource.name}
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="start-date"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Start date
                </label>

                <input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(event) =>
                    setStartDate(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="start-time"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Start time
                </label>

                <input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(event) =>
                    setStartTime(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="end-date"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  End date
                </label>

                <input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(event) =>
                    setEndDate(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="end-time"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  End time
                </label>

                <input
                  id="end-time"
                  type="time"
                  value={endTime}
                  onChange={(event) =>
                    setEndTime(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="notes"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Notes
                <span className="ml-1 font-normal text-slate-400">
                  (optional)
                </span>
              </label>

              <textarea
                id="notes"
                rows={4}
                value={notes}
                onChange={(event) =>
                  setNotes(event.target.value)
                }
                placeholder="Tell staff anything they should know about this booking..."
                className="w-full resize-none rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              )}

              {submitting
                ? "Submitting..."
                : "Submit booking request"}
            </button>
          </form>
        </section>

        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              My bookings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Track the status of your booking requests.
            </p>
          </div>

          {bookings.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <CalendarDays
                size={40}
                className="mx-auto text-slate-400"
              />

              <h3 className="mt-4 font-semibold text-slate-900">
                No bookings yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Your booking requests will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const resource = resources.find(
                  (item) => item.id === booking.resource_id,
                )

                const canCancel =
                  booking.status === "pending" ||
                  booking.status === "approved"

                return (
                  <article
                    key={booking.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-semibold text-slate-900">
                            {resource?.name ??
                              "Unknown resource"}
                          </h3>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                              booking.status,
                            )}`}
                          >
                            {booking.status.replace(
                              "_",
                              " ",
                            )}
                          </span>
                        </div>

                        <div className="mt-3 space-y-2 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <CalendarDays size={16} />
                            {formatDateTime(
                              booking.start_time,
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            Until{" "}
                            {formatDateTime(
                              booking.end_time,
                            )}
                          </div>
                        </div>

                        {booking.notes && (
                          <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                            {booking.notes}
                          </p>
                        )}
                      </div>

                      {canCancel && (
                        <button
                          type="button"
                          onClick={() =>
                            handleCancel(booking.id)
                          }
                          disabled={
                            cancellingId === booking.id
                          }
                          className="flex items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <XCircle size={16} />

                          {cancellingId === booking.id
                            ? "Cancelling..."
                            : "Cancel"}
                        </button>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}