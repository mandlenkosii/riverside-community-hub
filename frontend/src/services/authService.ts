import { supabase } from "../lib/supabase"

export interface RegisterData {
  fullName: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export const authService = {
  async register({ fullName, email, password }: RegisterData) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      throw error
    }

    return data
  },

  async login({ email, password }: LoginData) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw error
    }

    return data
  },

  async logout() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    }
  },

  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      throw error
    }

    return user
  },

  async getSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      throw error
    }

    return session
  },
}