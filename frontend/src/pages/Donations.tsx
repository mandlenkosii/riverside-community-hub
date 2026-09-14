import { useEffect, useState } from "react";
import { CheckCircle2, Heart, Loader2, Target, Users } from "lucide-react";

import {
  donationService,
  type Campaign,
  type DonationType,
} from "../services/donationService";

export default function Donations() {
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [donationType, setDonationType] = useState<DonationType>("one_off");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadCampaign();
  }, []);

  async function loadCampaign() {
    try {
      setLoading(true);
      setError("");

      const data = await donationService.getActiveCampaign();

      setCampaign(data);
    } catch (err) {
      console.error("Unable to load campaign:", err);

      setError(
        "We couldn't load the donation campaign right now. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!campaign) {
      setError("There is currently no active campaign.");
      return;
    }

    const donationAmount = Number(amount);

    if (!donorName.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!donorEmail.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!donationAmount || donationAmount <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }

    try {
      setSubmitting(true);

      await donationService.createDonation({
        donor_name: donorName,
        donor_email: donorEmail,
        amount: donationAmount,
        donation_type: donationType,
        campaign_id: campaign.id,
      });

      setSuccess("Thank you for supporting Riverside Community Hub.");

      setDonorName("");
      setDonorEmail("");
      setAmount("");
      setDonationType("one_off");

      await loadCampaign();
    } catch (err) {
      console.error("Donation submission failed:", err);

      setError("We couldn't record your donation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const progress = campaign
    ? Math.min((campaign.current_amount / campaign.goal_amount) * 100, 100)
    : 0;

  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700">
              <Heart size={16} />
              Support Riverside
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Your contribution can make a real difference.
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Help Riverside Community Hub continue supporting families, young
              people and community programmes. Every contribution helps us
              create a stronger community.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-3">
              <div className="h-6 w-32 rounded bg-slate-200" />
              <div className="mt-5 h-10 w-3/4 rounded bg-slate-200" />
              <div className="mt-4 h-4 w-full rounded bg-slate-200" />
              <div className="mt-2 h-4 w-5/6 rounded bg-slate-200" />
              <div className="mt-8 h-4 w-full rounded bg-slate-200" />
            </div>

            <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-2">
              <div className="h-7 w-40 rounded bg-slate-200" />
              <div className="mt-6 h-12 rounded-xl bg-slate-200" />
              <div className="mt-4 h-12 rounded-xl bg-slate-200" />
              <div className="mt-4 h-12 rounded-xl bg-slate-200" />
            </div>
          </div>
        ) : error && !campaign ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="font-semibold text-red-900">
              Unable to load donation campaign
            </h2>

            <p className="mt-2 text-sm text-red-700">{error}</p>

            <button
              type="button"
              onClick={loadCampaign}
              className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Try again
            </button>
          </div>
        ) : !campaign ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <Target className="mx-auto text-slate-400" size={36} />

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              No active campaign
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              There is currently no active donation campaign. Please check back
              later.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Campaign */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Target size={28} />
              </div>

              <p className="mt-7 text-sm font-semibold uppercase tracking-wider text-emerald-600">
                Active campaign
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                {campaign.title}
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {campaign.description ||
                  "Help Riverside reach its community fundraising goal and support people who need it most."}
              </p>

              {/* Progress */}
              <div className="mt-10">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-3xl font-bold text-slate-950">
                      R
                      {Number(campaign.current_amount).toLocaleString("en-ZA", {
                        minimumFractionDigits: 2,
                      })}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">raised so far</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-700">
                      R
                      {Number(campaign.goal_amount).toLocaleString("en-ZA", {
                        minimumFractionDigits: 2,
                      })}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      fundraising goal
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-4 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-600 transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex justify-between text-sm">
                  <span className="font-medium text-emerald-700">
                    {progress.toFixed(0)}% funded
                  </span>

                  <span className="text-slate-500">
                    Goal: R
                    {Number(campaign.goal_amount).toLocaleString("en-ZA")}
                  </span>
                </div>
              </div>

              {/* Impact cards */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <Users className="text-emerald-600" size={22} />

                  <h3 className="mt-4 font-semibold text-slate-900">
                    Support people
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Help Riverside provide practical support to people and
                    families in the community.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <Heart className="text-rose-500" size={22} />

                  <h3 className="mt-4 font-semibold text-slate-900">
                    Strengthen community
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Your contribution helps keep important community initiatives
                    running.
                  </p>
                </div>
              </div>
            </div>

            {/* Donation form */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-rose-600">
                  Make a contribution
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-950">
                  Support this campaign
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Complete the form below to record your contribution.
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

              {error && campaign && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-medium text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div>
                  <label
                    htmlFor="donorName"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Full name
                  </label>

                  <input
                    id="donorName"
                    type="text"
                    value={donorName}
                    onChange={(event) => setDonorName(event.target.value)}
                    placeholder="Enter your name"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="donorEmail"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>

                  <input
                    id="donorEmail"
                    type="email"
                    value={donorEmail}
                    onChange={(event) => setDonorEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="amount"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Contribution amount
                  </label>

                  <div className="relative mt-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                      R
                    </span>

                    <input
                      id="amount"
                      type="number"
                      min="1"
                      step="0.01"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                      placeholder="500.00"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Contribution type
                  </p>

                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDonationType("one_off")}
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        donationType === "one_off"
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      One-off
                    </button>

                    <button
                      type="button"
                      onClick={() => setDonationType("recurring_pledge")}
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        donationType === "recurring_pledge"
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      Recurring pledge
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Recording contribution...
                    </>
                  ) : (
                    <>
                      <Heart size={18} />
                      Support the campaign
                    </>
                  )}
                </button>

                <p className="text-center text-xs leading-5 text-slate-500">
                  This demo records the contribution in the Riverside platform.
                  No real payment is processed.
                </p>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
