type User = {
  id: number
  full_name: string
  email: string
  email_verified_at: string
  phone: string
  hashed_password: string
  gender: 'male' | 'female' | 'other'
  role: 'admin' | 'owner' | 'customer'
  date_of_birth: string
  remember_token: string
  created_at: string
  updated_at: string
}

export type { User }
