import { supabase } from "../lib/supabase"

export interface Programme {
  id: string
  title: string
  description: string | null
  category: string | null
  schedule: string | null
  image_url: string | null
  active: boolean
  created_at: string
  updated_at: string
}

export const programmeService = {
  async getActiveProgrammes(): Promise<Programme[]> {
    const { data, error } = await supabase
      .from("programmes")
      .select("*")
      .eq("active", true)
      .order("title")

    if (error) {
      throw error
    }

    return data as Programme[]
  },
}