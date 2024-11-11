import { Address } from './Address'

type Shop = {
  id: number
  name: string
  phone: string
  is_alive: boolean
  created_at: string
  updated_at: string
  owner_id: number
  address: Address
}

export type { Shop }
