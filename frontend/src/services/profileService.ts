import { supabase } from "../lib/supabase"

export type UserRole = "member" | "staff" | "admin"
export type MembershipTier = "free" | "standard" | "family"
export type MembershipStatus = "active" | "expiring_soon" | "expired"

export interface Profile {
  id: string
  full_name: string
  email: string | null
  phone: string | null
  role: UserRole
  membership_tier: MembershipTier
  membership_status: MembershipStatus
  joined_at: string
  membership_expires_at: string | null
  created_at: string
  updated_at: string
}

export interface UpdateProfileData {
  full_name: string
  phone: string
}

export const profileService = {
  async getCurrentProfile(): Promise<Profile | null> {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      throw userError
    }

    if (!user) {
      return null
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (error) {
      throw error
    }

    return data as Profile
  },

  async updateCurrentProfile(
    updates: UpdateProfileData,
  ): Promise<Profile> {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      throw userError
    }

    if (!user) {
      throw new Error("You must be logged in to update your profile.")
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({
        full_name: updates.full_name.trim(),
        phone: updates.phone.trim() || null,
      })
      .eq("id", user.id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data as Profile
  },
}