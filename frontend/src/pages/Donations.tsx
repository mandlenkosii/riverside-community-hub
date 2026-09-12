import { useEffect, useState } from "react"
import {
  ArrowLeft,
  Heart,
  Loader2,
  Target,
} from "lucide-react"
import { Link } from "react-router-dom"

import {
  donationService,
  type Campaign,
  type DonationType,
} from "../services/donationService"

export default function Donations() {
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [donorName, setDonorName] = useState("")
  const [donorEmail, setDonorEmail] = useState("")
  const [amount, setAmount] = useState("")
  const [donationType, setDonationType] =
    useState<DonationType>("one_off")

  useEffect(() => {
    const loadCampaign = async () => {
      try {
        setLoading(true)
        setError("")

        const data =
          await donationService.getActiveCampaign()

        setCampaign(data)
      } catch (err) {
        console.error("Campaign loading error:", err)

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load the donation campaign.",
        )
      } finally {
        setLoading(false)
      }
    }

    loadCampaign()
  }, [])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (!campaign) {
      setError("No active donation campaign is available.")
      return
    }

    const numericAmount = Number(amount)

    if (!donorName.trim()) {
      setError("Please enter your name.")
      return
    }

    if (!donorEmail.trim()) {
      setError("Please enter your email address.")
      return
    }

    if (
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      setError("Please enter a valid donation amount.")
      return
    }

    try {
      setSubmitting(true)
      setError("")
      setSuccess("")

      await donationService.createDonation({
        donor_name: donorName,
        donor_email: donorEmail,
        amount: numericAmount,
        donation_type: donationType,
        campaign_id: campaign.id,
      })

      setSuccess(
        "Thank you! Your donation has been recorded successfully.",
      )

      setDonorName("")
      setDonorEmail("")
      setAmount("")
      setDonationType("one_off")

      const updatedCampaign =
        await donationService.getActiveCampaign()

      setCampaign(updatedCampaign)
    } catch (err) {
      console.error("Donation submission error:", err)

      setError(
        err instanceof Error
          ? err.message
          : "Unable to record your donation.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">
          Loading donation campaign...
        </p>
      </main>
    )
  }

  const progress =
    campaign && campaign.goal_amount > 0
      ? Math.min(
          (campaign.current_amount /
            campaign.goal_amount) *
            100,
          100,
        )
      : 0

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to Riverside
        </Link>

        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Support Our Community
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Make a Difference
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Your contribution helps Riverside Community Hub support
            local families and strengthen community programmes.
          </p>
        </header>

        {error && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-8 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">
            {success}
          </div>
        )}

        {!campaign ? (
          <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
            <Heart
              size={42}
              className="mx-auto text-slate-400"
            />

            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              No active campaign
            </h2>

            <p className="mt-2 text-slate-600">
              There is currently no active donation campaign.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-5">
            <section className="lg:col-span-3">
              <div className="rounded-2xl bg-slate-900 p-7 text-white shadow-sm sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-300">
                      Current campaign
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                      {campaign.title}
                    </h2>
                  </div>

                  <div className="rounded-xl bg-white/10 p-3">
                    <Target size={25} />
                  </div>
                </div>

                {campaign.description && (
                  <p className="mt-5 leading-7 text-slate-300">
                    {campaign.description}
                  </p>
                )}

                <div className="mt-8">
                  <div className="mb-3 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-3xl font-bold">
                        R
                        {campaign.current_amount.toLocaleString(
                          "en-ZA",
                          {
                            minimumFractionDigits: 2,
                          },
                        )}
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        raised so far
                      </p>
                    </div>

                    <p className="text-sm font-medium text-slate-300">
                      Goal: R
                      {campaign.goal_amount.toLocaleString(
                        "en-ZA",
                        {
                          minimumFractionDigits: 2,
                        },
                      )}
                    </p>
                  </div>

                  <div className="h-4 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-white transition-all"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <p className="mt-3 text-sm text-slate-400">
                    {progress.toFixed(1)}% of our campaign goal
                  </p>
                </div>
              </div>
            </section>

            <section className="lg:col-span-2">
              <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 sm:p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Support the campaign
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Submit your donation pledge below.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div>
                    <label
                      htmlFor="donorName"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Name
                    </label>

                    <input
                      id="donorName"
                      type="text"
                      value={donorName}
                      onChange={(event) =>
                        setDonorName(event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="donorEmail"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Email
                    </label>

                    <input
                      id="donorEmail"
                      type="email"
                      value={donorEmail}
                      onChange={(event) =>
                        setDonorEmail(event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="amount"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Donation amount
                    </label>

                    <div className="flex">
                      <span className="flex items-center rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 px-3 text-slate-500">
                        R
                      </span>

                      <input
                        id="amount"
                        type="number"
                        min="1"
                        step="0.01"
                        value={amount}
                        onChange={(event) =>
                          setAmount(event.target.value)
                        }
                        className="w-full rounded-r-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                        placeholder="500"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium text-slate-700">
                      Donation type
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setDonationType("one_off")
                        }
                        className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                          donationType === "one_off"
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        One-off
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setDonationType(
                            "recurring_pledge",
                          )
                        }
                        className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                          donationType ===
                          "recurring_pledge"
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        Recurring
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />
                        Recording...
                      </>
                    ) : (
                      <>
                        <Heart size={17} />
                        Submit donation
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs leading-5 text-slate-500">
                    This demo records your donation pledge in the
                    Riverside system. Online payment processing will
                    be integrated separately.
                  </p>
                </form>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  )
}