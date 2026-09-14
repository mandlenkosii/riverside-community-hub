import { useEffect, useState } from "react";
import {
  CalendarDays,
  Heart,
  LogOut,
  User,
  Clock,
  CheckCircle2,
  Bell,
  ArrowRight,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { profileService, type Profile } from "../services/profileService";
import { bookingService, type Booking } from "../services/bookingService";
import { resourceService, type Resource } from "../services/resourceService";
import {
  notificationService,
  type Notification,
} from "../services/notificationService";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [bookingLoading, setBookingLoading] = useState(true);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationLoading, setNotificationLoading] = useState(true);
  const [notificationError, setNotificationError] = useState("");

  async function loadNotifications() {
    try {
      setNotificationLoading(true);
      setNotificationError("");

      const data = await notificationService.getMyNotifications();

      setNotifications(data);
    } catch (error) {
      console.error("Unable to load notifications:", error);
      setNotificationError("Unable to load notifications.");
    } finally {
      setNotificationLoading(false);
    }
  }

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

  useEffect(() => {
    loadBookings();
    loadNotifications();
  }, []);

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

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read,
  );

  const getResourceName = (resourceId: string) => {
    return (
      resources.find((resource) => resource.id === resourceId)?.name ??
      "Unknown resource"
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("en-ZA", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="text-sm font-medium text-slate-600">
            Loading your dashboard...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
            <User className="text-red-500" size={26} />
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-900">
            Unable to load your profile
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="group">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <Activity size={21} />
              </div>

              <div>
                <h1 className="text-base font-bold text-slate-900 sm:text-lg">
                  Riverside Community Hub
                </h1>

                <p className="text-xs text-slate-500">Member Dashboard</p>
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:px-4"
          >
            <LogOut size={17} />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Welcome */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-lg sm:p-8 lg:p-10">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-blue-50 ring-1 ring-white/20">
              <ShieldCheck size={14} />
              Riverside Member
            </div>

            <p className="mt-5 text-sm font-medium text-blue-100">
              Welcome back
            </p>

            <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
              {profile?.full_name || "Riverside Member"}
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
              Manage your membership, book community facilities, follow your
              activities, and support Riverside campaigns from one place.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/bookings"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
              >
                <CalendarDays size={17} />
                Book a facility
              </Link>

              <Link
                to="/donations"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/20"
              >
                <Heart size={17} />
                Support Riverside
              </Link>
            </div>
          </div>

          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-28 right-20 h-72 w-72 rounded-full bg-indigo-400/20" />
        </section>

        {/* Membership */}
        <section className="mt-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600">Membership</p>

              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Your membership
              </h3>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {/* Tier */}
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <User size={21} />
                </div>

                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  Member
                </span>
              </div>

              <p className="mt-5 text-sm text-slate-500">Membership tier</p>

              <p className="mt-1 text-lg font-bold capitalize text-slate-900">
                {profile?.membership_tier || "Free"}
              </p>
            </div>

            {/* Status */}
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={21} />
              </div>

              <p className="mt-5 text-sm text-slate-500">Membership status</p>

              <div className="mt-1 flex items-center gap-2">
                <p className="text-lg font-bold capitalize text-slate-900">
                  {profile?.membership_status?.replace("_", " ") || "Active"}
                </p>
              </div>
            </div>

            {/* Joined */}
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <CalendarDays size={21} />
              </div>

              <p className="mt-5 text-sm text-slate-500">Member since</p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {profile?.joined_at
                  ? formatDate(profile.joined_at)
                  : "Not available"}
              </p>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="mt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Bell size={18} />
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  Notifications
                </h3>

                {unreadNotifications.length > 0 && (
                  <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">
                    {unreadNotifications.length}
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Important updates about your Riverside activities.
              </p>
            </div>
          </div>

          {notificationError && (
            <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
              {notificationError}
            </div>
          )}

          {notificationLoading ? (
            <div className="mt-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

                <p className="text-sm text-slate-500">
                  Loading notifications...
                </p>
              </div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                <Bell size={22} />
              </div>

              <h4 className="mt-4 font-semibold text-slate-900">
                You're all caught up
              </h4>

              <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                You will see important updates about your bookings and Riverside
                activities here.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-2xl p-5 shadow-sm transition ${
                    notification.read
                      ? "bg-white ring-1 ring-slate-100"
                      : "bg-blue-50 ring-1 ring-blue-100"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        notification.read
                          ? "bg-slate-100 text-slate-400"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {notification.read ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <Bell size={18} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <p
                          className={`text-sm leading-6 ${
                            notification.read
                              ? "text-slate-700"
                              : "font-semibold text-slate-900"
                          }`}
                        >
                          {notification.message}
                        </p>

                        {!notification.read && (
                          <span className="w-fit shrink-0 rounded-full bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">
                            New
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        {new Date(notification.created_at).toLocaleString(
                          "en-ZA",
                        )}
                      </p>

                      {!notification.read && (
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              await notificationService.markAsRead(
                                notification.id,
                              );

                              setNotifications((current) =>
                                current.map((item) =>
                                  item.id === notification.id
                                    ? {
                                        ...item,
                                        read: true,
                                      }
                                    : item,
                                ),
                              );
                            } catch (error) {
                              console.error(
                                "Unable to mark notification as read:",
                                error,
                              );
                            }
                          }}
                          className="mt-3 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Booking Overview */}
        <section className="mt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-600">
                Facilities
              </p>

              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Your bookings
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Keep track of your facility requests and upcoming bookings.
              </p>
            </div>

            <Link
              to="/bookings"
              className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
            >
              View all bookings
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Booking Stats */}
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Clock size={21} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Pending</p>

                  <p className="mt-0.5 text-2xl font-bold text-slate-900">
                    {pendingBookings.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={21} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Approved</p>

                  <p className="mt-0.5 text-2xl font-bold text-slate-900">
                    {approvedBookings.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <CalendarDays size={21} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Upcoming</p>

                  <p className="mt-0.5 text-2xl font-bold text-slate-900">
                    {upcomingBookings.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Booking List */}
          <div className="mt-5">
            {bookingLoading ? (
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-emerald-600" />

                  <p className="text-sm text-slate-500">
                    Loading your bookings...
                  </p>
                </div>
              </div>
            ) : upcomingBookings.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CalendarDays size={23} />
                </div>

                <h4 className="mt-4 font-semibold text-slate-900">
                  No upcoming bookings
                </h4>

                <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-500">
                  Book a room, facility, or piece of equipment when you need
                  space for your activities.
                </p>

                <Link
                  to="/bookings"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  <CalendarDays size={17} />
                  Book a facility
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingBookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking.id}
                    className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <CalendarDays size={19} />
                          </div>

                          <div className="min-w-0">
                            <h4 className="truncate font-semibold text-slate-900">
                              {getResourceName(booking.resource_id)}
                            </h4>

                            <p className="mt-0.5 text-xs text-slate-500">
                              Facility booking
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 sm:ml-13">
                          <span className="flex items-center gap-2">
                            <CalendarDays size={15} />
                            {formatDate(booking.start_time)}
                          </span>

                          <span className="flex items-center gap-2">
                            <Clock size={15} />
                            {formatTime(booking.start_time)}
                            {" – "}
                            {formatTime(booking.end_time)}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-bold capitalize ${
                          booking.status === "approved"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-10">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              Get things done
            </p>

            <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              Quick actions
            </h3>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {/* Booking */}
            <Link
              to="/bookings"
              className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                  <CalendarDays size={24} />
                </div>

                <ArrowRight
                  size={20}
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
                />
              </div>

              <h4 className="mt-5 text-lg font-bold text-slate-900">
                Book a facility
              </h4>

              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600">
                View available rooms and equipment and submit a booking request.
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                Make a booking
                <ArrowRight size={16} />
              </span>
            </Link>

            {/* Donations */}
            <Link
              to="/donations"
              className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500 transition group-hover:bg-red-500 group-hover:text-white">
                  <Heart size={24} />
                </div>

                <ArrowRight
                  size={20}
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-red-500"
                />
              </div>

              <h4 className="mt-5 text-lg font-bold text-slate-900">
                Support a campaign
              </h4>

              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600">
                Contribute to Riverside's active community campaigns and
                programmes.
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-red-500">
                View campaigns
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </section>

        {/* Account Information */}
        <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <User size={20} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Account information</h3>

              <p className="text-sm text-slate-500">
                Your current member details
              </p>
            </div>
          </div>

          <div className="mt-6 divide-y divide-slate-100">
            <div className="flex flex-col gap-1 py-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm text-slate-500">Email</span>

              <span className="break-all text-sm font-semibold text-slate-900 sm:text-right">
                {profile?.email || user?.email || "-"}
              </span>
            </div>

            <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm text-slate-500">Phone</span>

              <span className="text-sm font-semibold text-slate-900 sm:text-right">
                {profile?.phone || "Not provided"}
              </span>
            </div>

            <div className="flex flex-col gap-1 py-4 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm text-slate-500">Role</span>

              <span className="text-sm font-semibold capitalize text-slate-900 sm:text-right">
                {profile?.role || "member"}
              </span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-slate-200 pt-6 text-center">
          <p className="text-xs text-slate-400">
            Riverside Community Hub · Member Portal
          </p>
        </footer>
      </div>
    </main>
  );
}
