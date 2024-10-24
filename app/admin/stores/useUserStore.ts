import { create } from 'zustand'
import type { User } from '@/types'

type State = {
  rowPerSlide: number
  activeSlide: number
  originalUserList: User[]
  shownUserList: User[]
  isUpdatingUser: boolean
  updatingUser: User | null

  setActiveSlide: (activeSlide: number) => void
  increaseActiveSlide: () => void
  decreaseActiveSlide: () => void
  setOriginalUserList: (originalUserList: User[]) => void
  setShownUserListByActiveSlide: (activeSlide: number) => void
  setIsUpdatingUser: (isUpdatingUser: boolean) => void
  setUpdatingUser: (updatingUser: User | null) => void
}

const useUserStore = create<State>((set, get) => ({
  rowPerSlide: 10,
  activeSlide: -1,
  originalUserList: [],
  shownUserList: [],
  isUpdatingUser: false,
  updatingUser: null,

  setActiveSlide: (activeSlide: number) => {
    const setShownUserListByActiveSlide = get().setShownUserListByActiveSlide
    set({ activeSlide })
    setShownUserListByActiveSlide(activeSlide)
  },
  increaseActiveSlide: () => {
    const setShownUserListByActiveSlide = get().setShownUserListByActiveSlide
    set((state) => ({ activeSlide: state.activeSlide + 1 }))
    setShownUserListByActiveSlide(get().activeSlide)
  },
  decreaseActiveSlide: () => {
    const setShownUserListByActiveSlide = get().setShownUserListByActiveSlide
    set((state) => ({ activeSlide: state.activeSlide - 1 }))
    setShownUserListByActiveSlide(get().activeSlide)
  },
  setOriginalUserList: (originalUserList: User[]) => {
    set({ originalUserList })
  },
  setShownUserListByActiveSlide: (activeSlide: number) => {
    const rowPerSlide = get().rowPerSlide
    const originalUserList = get().originalUserList
    const shownUserList = originalUserList.slice(activeSlide * rowPerSlide, activeSlide * rowPerSlide + rowPerSlide)
    set({ shownUserList })
  },
  setIsUpdatingUser: (isUpdatingUser: boolean) => {
    set({ isUpdatingUser })
  },
  setUpdatingUser: (updatingUser: User | null) => {
    set({ updatingUser })
  },
}))

export type { State }
export default useUserStore
