import { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  XCircle,
  CalendarDays,
  RefreshCw,
} from "lucide-react";

import {
  staffBookingService,
  type StaffBooking,
} from "../services/staffBookingService";

type Filter = "all" | "pending" | "approved" | "rejected";

export default function StaffDashboard() {
  const [bookings, setBookings] = useState<StaffBooking[]>([]);
  const [filter, setFilter] = useState<Filter>("pending");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function loadBookings(showRefresh = false) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const data = await staffBookingService.getAllBookings();
      setBookings(data);
    } catch (err) {
      console.error("Unable to load staff bookings:", err);
      setError("Unable to load booking information.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function handleStatusUpdate(
    bookingId: string,
    status: "approved" | "rejected",
  ) {
    try {
      setUpdatingId(bookingId);
      setError("");

      await staffBookingService.updateBookingStatus(bookingId, status);

      await loadBookings();
    } catch (err) {
      console.error("Unable to update booking:", err);

      const message =
        err instanceof Error ? err.message : "Unknown error occurred.";
      setError(`Unable to update the booking. ${message}`);
    } finally {
      setUpdatingId(null);
    }
  }

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending",
  );

  const approvedBookings = bookings.filter(
    (booking) => booking.status === "approved",
  );

  const rejectedBookings = bookings.filter(
    (booking) => booking.status === "rejected",
  );

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function formatTime(date: string) {
    return new Date(date).toLocaleTimeString("en-ZA", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function statusClasses(status: StaffBooking["status"]) {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "cancelled":
        return "bg-slate-100 text-slate-600";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Staff Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Booking management
            </h1>

            <p className="mt-2 text-slate-600">
              Review and manage facility and equipment booking requests.
            </p>
          </div>

          <button
            type="button"
            onClick={() => loadBookings(true)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw size={17} className={refreshing ? "animate-spin" : ""} />

            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => setFilter("pending")}
            className={`rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
              filter === "pending" ? "ring-2 ring-yellow-400" : ""
            }`}
          >
            <Clock className="text-yellow-600" size={28} />

            <p className="mt-4 text-sm text-slate-500">Pending</p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {pendingBookings.length}
            </p>
          </button>

          <button
            type="button"
            onClick={() => setFilter("approved")}
            className={`rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
              filter === "approved" ? "ring-2 ring-green-400" : ""
            }`}
          >
            <CheckCircle className="text-green-600" size={28} />

            <p className="mt-4 text-sm text-slate-500">Approved</p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {approvedBookings.length}
            </p>
          </button>

          <button
            type="button"
            onClick={() => setFilter("rejected")}
            className={`rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
              filter === "rejected" ? "ring-2 ring-red-400" : ""
            }`}
          >
            <XCircle className="text-red-600" size={28} />

            <p className="mt-4 text-sm text-slate-500">Rejected</p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {rejectedBookings.length}
            </p>
          </button>
        </div>

        <section className="mt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <CalendarDays className="text-blue-600" size={24} />

              <h2 className="text-2xl font-bold text-slate-900">
                Booking requests
              </h2>
            </div>

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value as Filter)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="all">All bookings</option>
            </select>
          </div>

          {loading ? (
            <div className="mt-6 rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />

              <p className="mt-4 text-sm text-slate-600">Loading bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-white p-8 text-center shadow-sm">
              <p className="font-semibold text-slate-900">
                No {filter === "all" ? "" : filter} bookings
              </p>

              <p className="mt-2 text-sm text-slate-600">
                There are currently no bookings in this category.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {booking.resource?.name ?? "Unknown resource"}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClasses(
                            booking.status,
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                        {booking.resource?.type ?? "resource"}
                      </p>

                      <div className="mt-3 space-y-1 text-sm text-slate-600">
                        <p>
                          <span className="font-medium">Member:</span>{" "}
                          {booking.member?.full_name ?? "Unknown member"}
                        </p>

                        {booking.member?.email && (
                          <p>
                            <span className="font-medium">Email:</span>{" "}
                            {booking.member.email}
                          </p>
                        )}

                        <p>
                          <span className="font-medium">Date:</span>{" "}
                          {formatDate(booking.start_time)}
                        </p>

                        <p>
                          <span className="font-medium">Time:</span>{" "}
                          {formatTime(booking.start_time)} –{" "}
                          {formatTime(booking.end_time)}
                        </p>

                        {booking.notes && (
                          <p>
                            <span className="font-medium">Notes:</span>{" "}
                            {booking.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    {booking.status === "pending" && (
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusUpdate(booking.id, "approved")
                          }
                          disabled={updatingId === booking.id}
                          className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {updatingId === booking.id
                            ? "Updating..."
                            : "Approve"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleStatusUpdate(booking.id, "rejected")
                          }
                          disabled={updatingId === booking.id}
                          className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {updatingId === booking.id ? "Updating..." : "Reject"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
