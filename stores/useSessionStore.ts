import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
  id: number
  fullName: string
  email: string
  role: string
}

type State = {
  isAuth: boolean
  user: User | null
  accessToken: string | null

  signIn: (user: User, accessToken: string) => void
  signOut: () => void
}

const useSessionStore = create<State>()(
  persist(
    (set) => ({
      isAuth: false,
      user: null,
      accessToken: null,
      signIn: (user, accessToken) => {
        set({ isAuth: true, user, accessToken })
      },
      signOut: () => {
        set({ isAuth: false, user: null, accessToken: null })
      },
    }),
    {
      name: 'session-storage',
    },
  ),
)

export default useSessionStore
