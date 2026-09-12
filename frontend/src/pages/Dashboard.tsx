import { useEffect, useState } from "react"
import {
  CalendarDays,
  Heart,
  LogOut,
  User,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"
import {
  profileService,
  type Profile,
} from "../services/profileService"

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true)
        setError("")

        const data = await profileService.getCurrentProfile()

        setProfile(data)
      } catch (err) {
        console.error("Profile loading error:", err)

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load your profile.",
        )
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      loadProfile()
    }
  }, [user])

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate("/")
    } catch (err) {
      console.error("Sign out error:", err)
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">
          Loading your dashboard...
        </p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-red-600">
            Unable to load your profile
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            {error}
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Riverside Community Hub
            </h1>

            <p className="text-sm text-slate-500">
              Member Dashboard
            </p>
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
          <p className="text-sm font-medium text-blue-100">
            Welcome back
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {profile?.full_name || "Riverside Member"}
          </h2>

          <p className="mt-2 text-blue-100">
            Manage your Riverside membership, bookings and
            community activities.
          </p>
        </section>

        {/* Membership */}
        <section className="mt-8">
          <h3 className="text-xl font-bold text-slate-900">
            Your membership
          </h3>

          <div className="mt-4 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                  <User size={22} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Membership
                  </p>

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
                  <p className="text-sm text-slate-500">
                    Status
                  </p>

                  <p className="font-semibold capitalize">
                    {profile?.membership_status?.replace(
                      "_",
                      " ",
                    ) || "Active"}
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
                  <p className="text-sm text-slate-500">
                    Joined
                  </p>

                  <p className="font-semibold">
                    {profile?.joined_at
                      ? new Date(
                          profile.joined_at,
                        ).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="mt-10">
          <h3 className="text-xl font-bold text-slate-900">
            Quick actions
          </h3>

          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <button className="rounded-2xl bg-white p-6 text-left shadow-sm transition hover:shadow-md">
              <CalendarDays className="text-blue-600" size={28} />

              <h4 className="mt-4 text-lg font-semibold">
                Book a facility
              </h4>

              <p className="mt-2 text-sm text-slate-600">
                View available rooms and equipment and make a
                booking request.
              </p>
            </button>

            <button className="rounded-2xl bg-white p-6 text-left shadow-sm transition hover:shadow-md">
              <Heart className="text-red-500" size={28} />

              <h4 className="mt-4 text-lg font-semibold">
                Support a campaign
              </h4>

              <p className="mt-2 text-sm text-slate-600">
                Contribute to Riverside's active community
                campaigns.
              </p>
            </button>
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
  )
}