import api from '@/api/api'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

type State = {
  isAuth: boolean
  user: User | null
  accessToken: string | null

  verifySession: () => void
  signIn: (user: User, accessToken: string) => void
  signOut: () => void
}

const useSessionStore = create<State>()(
  persist(
    (set, get) => ({
      isAuth: false,
      user: null,
      accessToken: null,

      verifySession: async () => {
        const accessToken = get().accessToken

        if (accessToken) {
          try {
            const { data: user } = await api.get('/me', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })

            set({ isAuth: true, user, accessToken })
          } catch (error) {
            console.error(error)
            set({ isAuth: false, user: null, accessToken: null })
          }
        } else {
          set({ isAuth: false, user: null, accessToken: null })
        }
      },
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
