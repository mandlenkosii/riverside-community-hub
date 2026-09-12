import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Mail,
  Phone,
  Save,
  Shield,
  User,
} from "lucide-react"

import { profileService, type Profile } from "../services/profileService"

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true)
        setError("")

        const data = await profileService.getCurrentProfile()

        if (!data) {
          setError("Unable to find your profile.")
          return
        }

        setProfile(data)
        setFullName(data.full_name)
        setPhone(data.phone ?? "")
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

    loadProfile()
  }, [])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (!fullName.trim()) {
      setError("Full name is required.")
      return
    }

    try {
      setSaving(true)
      setError("")
      setSuccess("")

      const updatedProfile =
        await profileService.updateCurrentProfile({
          full_name: fullName,
          phone,
        })

      setProfile(updatedProfile)
      setFullName(updatedProfile.full_name)
      setPhone(updatedProfile.phone ?? "")
      setSuccess("Your profile has been updated successfully.")
    } catch (err) {
      console.error("Profile update error:", err)

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update your profile.",
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">
          Loading your profile...
        </p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <p className="mb-4 text-red-600">
            {error || "Unable to load your profile."}
          </p>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>
        </div>
      </div>
    )
  }

  const formattedJoinDate = new Date(
    profile.joined_at,
  ).toLocaleDateString()

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            My Profile
          </h1>

          <p className="mt-2 text-slate-600">
            Manage your personal information and view your membership details.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            <CheckCircle2 size={18} />
            {success}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update the information associated with your Riverside account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Full name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(event) =>
                      setFullName(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    value={profile.email ?? ""}
                    disabled
                    className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 py-2.5 pl-10 pr-3 text-slate-500"
                  />
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  Your login email is managed by your authentication account.
                </p>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Phone number
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={17} />

                {saving ? "Saving..." : "Save changes"}
              </button>
            </form>
          </section>

          <aside className="space-y-6">
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-lg bg-slate-100 p-2">
                  <Shield
                    size={20}
                    className="text-slate-700"
                  />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Membership
                  </h2>

                  <p className="text-xs text-slate-500">
                    Current membership details
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Tier
                  </p>

                  <p className="mt-1 capitalize font-medium text-slate-900">
                    {profile.membership_tier}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Status
                  </p>

                  <span className="mt-1 inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium capitalize text-green-700">
                    {profile.membership_status.replace("_", " ")}
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center gap-3">
                <CalendarDays
                  size={20}
                  className="text-slate-600"
                />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Member since
                  </p>

                  <p className="mt-1 font-medium text-slate-900">
                    {formattedJoinDate}
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}