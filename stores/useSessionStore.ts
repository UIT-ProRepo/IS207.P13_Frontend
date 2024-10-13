import { create } from 'zustand'
import api from '@/api/api'

type User = {
  id: number
  name: string
  email: string
  email_verified_at: string
  role: string
  created_at: string
  updated_at: string
}

type State = {
  isAuth: boolean
  user: User | null
  accessToken: string | null

  fetchUser: () => Promise<User | null>
  signIn: (user: User, accessToken: string) => void
  signOut: () => void
}

const useSessionStore = create<State>((set) => ({
  isAuth: false,
  user: null,
  accessToken: null,

  fetchUser: async () => {
    const accessToken = localStorage.getItem('access_token')

    if (!accessToken) return null

    try {
      const { data: user } = await api.get('/me')
      set({ isAuth: true, user })
      set({ accessToken })
      return user
    } catch (err) {
      console.error(err)
      localStorage.removeItem('access_token')
      return null
    }
  },
  signIn: (user, accessToken) => {
    localStorage.setItem('access_token', accessToken)
    set({ isAuth: true, user, accessToken })
  },
  signOut: () => {
    localStorage.removeItem('access_token')
    set({ isAuth: false, user: null, accessToken: null })
  },
}))

export default useSessionStore
