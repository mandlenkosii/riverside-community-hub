import { supabase } from "../lib/supabase"

export type ResourceType = "room" | "equipment"

export interface Resource {
  id: string
  name: string
  type: ResourceType
  capacity: number | null
  description: string | null
  available: boolean
  created_at: string
  updated_at: string
}

export const resourceService = {
  async getAvailableResources(): Promise<Resource[]> {
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("available", true)
      .order("type")
      .order("name")

    if (error) {
      throw error
    }

    return data as Resource[]
  },
}