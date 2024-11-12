type Review = {
  id: number
  user_id: number
  product_id: number
  rating: number
  comment: string
  approval_status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export type { Review }
