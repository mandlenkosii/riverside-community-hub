import { supabase } from "../lib/supabase"

export type DonationType = "one_off" | "recurring_pledge"

export interface Campaign {
  id: string
  title: string
  description: string | null
  goal_amount: number
  current_amount: number
  active: boolean
  start_date: string | null
  end_date: string | null
  created_at: string
  updated_at: string
}

export interface DonationData {
  donor_name: string
  donor_email: string
  amount: number
  donation_type: DonationType
  campaign_id: string
}

export const donationService = {
  async getActiveCampaign(): Promise<Campaign | null> {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .eq("active", true)
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle()

    if (error) {
      throw error
    }

    return data as Campaign | null
  },

  async createDonation(data: DonationData): Promise<void> {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { error } = await supabase
      .from("donations")
      .insert({
        donor_id: user?.id ?? null,
        donor_name: data.donor_name.trim(),
        donor_email: data.donor_email.trim(),
        amount: data.amount,
        donation_type: data.donation_type,
        campaign_id: data.campaign_id,
        payment_status: "recorded",
      })

    if (error) {
      throw error
    }
  },
}