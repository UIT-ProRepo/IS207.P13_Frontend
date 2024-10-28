import type { User } from './User'

type Session = {
  user: User
  access_token: string
}

export type { Session }
