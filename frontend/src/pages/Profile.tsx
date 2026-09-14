import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  User,
} from "lucide-react";

import { supabase } from "../lib/supabase";

interface ProfileData {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: "member" | "staff" | "admin";
  membership_tier: "free" | "standard" | "family";
  membership_status: "active" | "expiring_soon" | "expired";
  joined_at: string;
  membership_expires_at: string | null;
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setError("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      if (!user) {
        throw new Error("You must be logged in to view your profile.");
      }

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;

      const profileData = data as ProfileData;

      setProfile(profileData);
      setFullName(profileData.full_name || "");
      setPhone(profileData.phone || "");
    } catch (err) {
      console.error("Unable to load profile:", err);

      setError("We couldn't load your profile right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    try {
      setSaving(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      if (!user) {
        throw new Error("You must be logged in to update your profile.");
      }

      const { data, error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName.trim(),
          phone: phone.trim() || null,
        })
        .eq("id", user.id)
        .select()
        .single();

      if (updateError) throw updateError;

      setProfile(data as ProfileData);
      setSuccess("Your profile has been updated successfully.");
    } catch (err) {
      console.error("Unable to update profile:", err);

      setError("We couldn't update your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-slate-50">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-5 w-32 rounded bg-slate-200" />
            <div className="mt-4 h-10 w-72 rounded bg-slate-200" />

            <div className="mt-10 grid gap-8 lg:grid-cols-3">
              <div className="h-72 rounded-3xl bg-slate-200 lg:col-span-1" />
              <div className="h-72 rounded-3xl bg-slate-200 lg:col-span-2" />
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-slate-50">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="font-semibold text-red-900">
              Unable to load profile
            </h2>

            <p className="mt-2 text-sm text-red-700">
              {error || "Your profile could not be found."}
            </p>

            <button
              type="button"
              onClick={loadProfile}
              className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Try again
            </button>
          </div>
        </section>
      </div>
    );
  }

  const membershipLabel =
    profile.membership_tier.charAt(0).toUpperCase() +
    profile.membership_tier.slice(1);

  const roleLabel =
    profile.role.charAt(0).toUpperCase() + profile.role.slice(1);

  const statusConfig = {
    active: {
      label: "Active",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    expiring_soon: {
      label: "Expiring soon",
      className: "bg-amber-50 text-amber-700 border-amber-200",
    },
    expired: {
      label: "Expired",
      className: "bg-red-50 text-red-700 border-red-200",
    },
  };

  const status = statusConfig[profile.membership_status];

  return (
    <div className="bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Account
          </span>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
            My profile
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Manage your personal information and view your Riverside membership
            details.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Membership card */}
          <aside className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="bg-slate-950 px-6 py-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                  <User size={30} />
                </div>

                <h2 className="mt-5 text-xl font-bold text-white">
                  {profile.full_name}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Riverside {roleLabel}
                </p>
              </div>

              <div className="space-y-5 p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Membership
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {membershipLabel}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Status
                  </p>

                  <span
                    className={`mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold ${status.className}`}
                  >
                    <span className="h-2 w-2 rounded-full bg-current" />
                    {status.label}
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Member since
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {new Date(profile.joined_at).toLocaleDateString("en-ZA", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {profile.membership_expires_at && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Membership expires
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {new Date(
                        profile.membership_expires_at,
                      ).toLocaleDateString("en-ZA", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <ShieldCheck className="text-emerald-600" size={23} />

              <h3 className="mt-4 font-semibold text-emerald-950">
                Your account is protected
              </h3>

              <p className="mt-2 text-sm leading-6 text-emerald-800">
                Your personal profile information is protected by your Riverside
                account permissions.
              </p>
            </div>
          </aside>

          {/* Profile form */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                  Personal information
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-950">
                  Update your details
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Keep your contact information up to date so Riverside can
                  reach you when necessary.
                </p>
              </div>

              {success && (
                <div className="mt-6 flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <CheckCircle2
                    className="shrink-0 text-emerald-600"
                    size={20}
                  />

                  <p className="text-sm font-medium text-emerald-800">
                    {success}
                  </p>
                </div>
              )}

              {error && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-medium text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Full name
                  </label>

                  <div className="relative mt-2">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>

                  <div className="relative mt-2">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-500"
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    Your email address is managed through your Riverside
                    account.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Phone number
                  </label>

                  <div className="relative mt-2">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                    />
                  </div>
                </div>

                {/* Read-only membership */}
                <div className="grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Membership tier
                    </p>

                    <p className="mt-2 text-lg font-bold text-slate-900">
                      {membershipLabel}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Account status
                    </p>

                    <p className="mt-2 flex items-center gap-2 text-lg font-bold text-slate-900">
                      {profile.membership_status === "active" ? (
                        <CheckCircle2 size={19} className="text-emerald-600" />
                      ) : (
                        <Clock3 size={19} className="text-amber-500" />
                      )}

                      {status.label}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end border-t border-slate-100 pt-6">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Save size={18} />

                    {saving ? "Saving changes..." : "Save changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
