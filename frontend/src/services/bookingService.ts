import { supabase } from "../lib/supabase"

export type BookingStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "cancelled"

export interface Booking {
  id: string
  resource_id: string
  member_id: string
  start_time: string
  end_time: string
  status: BookingStatus
  notes: string | null
  created_at: string
  updated_at: string
}

export interface CreateBookingData {
  resource_id: string
  start_time: string
  end_time: string
  notes?: string
}

export const bookingService = {
  async getMyBookings(): Promise<Booking[]> {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      throw userError
    }

    if (!user) {
      throw new Error("You must be logged in to view your bookings.")
    }

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("member_id", user.id)
      .order("start_time", {
        ascending: false,
      })

    if (error) {
      throw error
    }

    return data as Booking[]
  },

  async createBooking(
    booking: CreateBookingData,
  ): Promise<void> {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      throw userError
    }

    if (!user) {
      throw new Error("You must be logged in to create a booking.")
    }

    const { error } = await supabase
      .from("bookings")
      .insert({
        resource_id: booking.resource_id,
        member_id: user.id,
        start_time: booking.start_time,
        end_time: booking.end_time,
        notes: booking.notes?.trim() || null,
        status: "pending",
      })

    if (error) {
      throw error
    }
  },

  async cancelBooking(bookingId: string): Promise<void> {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      throw userError
    }

    if (!user) {
      throw new Error("You must be logged in to cancel a booking.")
    }

    const { error } = await supabase
      .from("bookings")
      .update({
        status: "cancelled",
      })
      .eq("id", bookingId)
      .eq("member_id", user.id)

    if (error) {
      throw error
    }
  },
}