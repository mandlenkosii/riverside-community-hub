import { supabase } from "../lib/supabase"

export type NotificationType =
  | "booking"
  | "membership"
  | "donation"
  | "system"

export interface Notification {
  id: string
  user_id: string
  message: string
  type: NotificationType
  read: boolean
  created_at: string
}

export const notificationService = {
  async getMyNotifications(): Promise<Notification[]> {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) throw userError

    if (!user) {
      throw new Error(
        "You must be logged in to view notifications."
      )
    }

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      })

    if (error) throw error

    return data as Notification[]
  },

  async markAsRead(notificationId: string): Promise<void> {
    const { error } = await supabase
      .from("notifications")
      .update({
        read: true,
      })
      .eq("id", notificationId)

    if (error) throw error
  },

  async createBookingNotification(
    userId: string,
    status: "approved" | "rejected"
  ): Promise<void> {
    const message =
      status === "approved"
        ? "Your booking request has been approved."
        : "Your booking request has been rejected."

    const { error } = await supabase
      .from("notifications")
      .insert({
        user_id: userId,
        message,
        type: "booking",
      })

    if (error) throw error
  },
}