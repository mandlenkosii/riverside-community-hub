import { useEffect, useState } from "react";
import {
  CalendarDays,
  Heart,
  LogOut,
  User,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { profileService, type Profile } from "../services/profileService";
import { bookingService, type Booking } from "../services/bookingService";

import { resourceService, type Resource } from "../services/resourceService";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [bookingLoading, setBookingLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);
  const loadBookings = async () => {
    try {
      setBookingLoading(true);

      const [bookingData, resourceData] = await Promise.all([
        bookingService.getMyBookings(),
        resourceService.getAvailableResources(),
      ]);

      setBookings(bookingData);
      setResources(resourceData);
    } catch (error) {
      console.error("Dashboard booking load error:", error);
    } finally {
      setBookingLoading(false);
    }
  };
  const upcomingBookings = bookings
    .filter(
      (booking) =>
        new Date(booking.start_time) > new Date() &&
        booking.status !== "cancelled" &&
        booking.status !== "rejected",
    )
    .sort(
      (a, b) =>
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
    );

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending",
  );

  const approvedBookings = bookings.filter(
    (booking) => booking.status === "approved",
  );

  const getResourceName = (resourceId: string) => {
    return (
      resources.find((resource) => resource.id === resourceId)?.name ??
      "Unknown resource"
    );
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await profileService.getCurrentProfile();

        setProfile(data);
      } catch (err) {
        console.error("Profile loading error:", err);

        setError(
          err instanceof Error ? err.message : "Unable to load your profile.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadProfile();
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading your dashboard...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-red-600">
            Unable to load your profile
          </h1>

          <p className="mt-2 text-sm text-slate-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Riverside Community Hub
            </h1>

            <p className="text-sm text-slate-500">Member Dashboard</p>
          </div>

          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Welcome */}
        <section className="rounded-2xl bg-blue-600 p-8 text-white">
          <p className="text-sm font-medium text-blue-100">Welcome back</p>

          <h2 className="mt-2 text-3xl font-bold">
            {profile?.full_name || "Riverside Member"}
          </h2>

          <p className="mt-2 text-blue-100">
            Manage your Riverside membership, bookings and community activities.
          </p>
        </section>

        {/* Membership */}
        <section className="mt-8">
          <h3 className="text-xl font-bold text-slate-900">Your membership</h3>

          <div className="mt-4 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                  <User size={22} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Membership</p>

                  <p className="font-semibold capitalize">
                    {profile?.membership_tier || "Free"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-green-100 p-3 text-green-600">
                  <User size={22} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Status</p>

                  <p className="font-semibold capitalize">
                    {profile?.membership_status?.replace("_", " ") || "Active"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                  <CalendarDays size={22} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Joined</p>

                  <p className="font-semibold">
                    {profile?.joined_at
                      ? new Date(profile.joined_at).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking overview */}
        <section className="mt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Your bookings
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Keep track of your facility requests and upcoming bookings.
              </p>
            </div>

            <Link
              to="/bookings"
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
            >
              View all bookings →
            </Link>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
                  <Clock size={20} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Pending</p>

                  <p className="text-2xl font-bold text-slate-900">
                    {pendingBookings.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Approved</p>

                  <p className="text-2xl font-bold text-slate-900">
                    {approvedBookings.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                  <CalendarDays size={20} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Upcoming</p>

                  <p className="text-2xl font-bold text-slate-900">
                    {upcomingBookings.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            {bookingLoading ? (
              <div className="rounded-2xl bg-white p-6 text-sm text-slate-500 shadow-sm">
                Loading your bookings...
              </div>
            ) : upcomingBookings.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <CalendarDays size={32} className="mx-auto text-slate-400" />

                <h4 className="mt-3 font-semibold text-slate-900">
                  No upcoming bookings
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  Book a facility when you need space or equipment for your
                  activities.
                </p>

                <Link
                  to="/bookings"
                  className="mt-4 inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Book a facility
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingBookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {getResourceName(booking.resource_id)}
                      </h4>

                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-2">
                          <CalendarDays size={15} />
                          {new Date(booking.start_time).toLocaleDateString()}
                        </span>

                        <span className="flex items-center gap-2">
                          <Clock size={15} />
                          {new Date(booking.start_time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {" – "}
                          {new Date(booking.end_time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        booking.status === "approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Actions */}
        <section className="mt-10">
          <h3 className="text-xl font-bold text-slate-900">Quick actions</h3>

          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <Link
              to="/bookings"
              className="rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <CalendarDays className="text-blue-600" size={28} />

              <h4 className="mt-4 text-lg font-semibold text-slate-900">
                Book a facility
              </h4>

              <p className="mt-2 text-sm text-slate-600">
                View available rooms and equipment and make a booking request.
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                Make a booking →
              </span>
            </Link>

            <Link
              to="/donations"
              className="rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <Heart className="text-red-500" size={28} />

              <h4 className="mt-4 text-lg font-semibold text-slate-900">
                Support a campaign
              </h4>

              <p className="mt-2 text-sm text-slate-600">
                Contribute to Riverside's active community campaigns.
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-red-500">
                View campaign →
              </span>
            </Link>
          </div>
        </section>

        {/* Account information */}
        <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">
            Account information
          </h3>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between border-b border-slate-100 pb-3">
              <span className="text-slate-500">Email</span>
              <span className="font-medium">
                {profile?.email || user?.email || "-"}
              </span>
            </div>

            <div className="flex justify-between border-b border-slate-100 pb-3">
              <span className="text-slate-500">Phone</span>
              <span className="font-medium">
                {profile?.phone || "Not provided"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Role</span>
              <span className="font-medium capitalize">
                {profile?.role || "member"}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
