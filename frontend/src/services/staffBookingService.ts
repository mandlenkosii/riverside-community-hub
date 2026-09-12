import { supabase } from "../lib/supabase";
import { notificationService } from "./notificationService";

export interface StaffBooking {
  id: string;
  resource_id: string;
  member_id: string;
  start_time: string;
  end_time: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  notes: string | null;
  created_at: string;
  resource?: {
    name: string;
    type: "room" | "equipment";
  };
  member?: {
    full_name: string;
    email: string | null;
  };
}

export const staffBookingService = {
  async getAllBookings(): Promise<StaffBooking[]> {
    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
        *,
        resource:resources (
          name,
          type
        ),
        member:profiles (
          full_name,
          email
        )
      `,
      )
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return data as StaffBooking[];
  },

  async updateBookingStatus(
    bookingId: string,
    status: "approved" | "rejected",
  ): Promise<void> {
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("member_id")
      .eq("id", bookingId)
      .single();

    if (bookingError) {
      throw bookingError;
    }

    const { error } = await supabase
      .from("bookings")
      .update({
        status,
      })
      .eq("id", bookingId);

    if (error) {
      throw error;
    }

    await notificationService.createBookingNotification(
      booking.member_id,
      status,
    );
  },
};
