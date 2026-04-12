export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'premium' | 'worker' | 'basic'
          agency_id: string | null
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          plan_type: string | null
          phone: string | null
          address: string | null
          about: string | null
          cover_url: string | null
        }
        Insert: {
          id: string
          email: string
          role?: 'admin' | 'premium' | 'worker' | 'basic'
          agency_id?: string | null
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          plan_type?: string | null
          phone?: string | null
          address?: string | null
          about?: string | null
          cover_url?: string | null
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'premium' | 'worker' | 'basic'
          agency_id?: string | null
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          plan_type?: string | null
          phone?: string | null
          address?: string | null
          about?: string | null
          cover_url?: string | null
        }
      }
      agencies: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string | null
          description?: string | null
          created_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          title: string
          description: string | null
          price: number
          category: string
          subtype: string
          status: string
          agent_id: string
          agency_id: string | null
          images: string[]
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          price: number
          category: string
          subtype: string
          status?: string
          agent_id: string
          agency_id?: string | null
          images?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          price?: number
          category?: string
          subtype?: string
          status?: string
          agent_id?: string
          agency_id?: string | null
          images?: string[]
          created_at?: string
        }
      }
      viewing_requests: {
        Row: {
          id: string
          property_id: string
          requester_name: string
          requester_email: string
          agent_id: string
          status: 'pending' | 'approved' | 'rejected'
          requested_date: string
        }
        Insert: {
          id?: string
          property_id: string
          requester_name: string
          requester_email: string
          agent_id: string
          status?: 'pending' | 'approved' | 'rejected'
          requested_date: string
        }
        Update: {
          id?: string
          property_id?: string
          requester_name?: string
          requester_email?: string
          agent_id?: string
          status?: 'pending' | 'approved' | 'rejected'
          requested_date?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          message?: string
          is_read?: boolean
          created_at?: string
        }
      }
      wallet: {
        Row: {
          id: string
          user_id: string
          balance: number
          currency: string
        }
        Insert: {
          id?: string
          user_id: string
          balance?: number
          currency?: string
        }
        Update: {
          id?: string
          user_id?: string
          balance?: number
          currency?: string
        }
      }
    }
  }
}
