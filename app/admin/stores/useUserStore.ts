import { create } from 'zustand'
import type { User } from '@/types'

type State = {
  fullNameIdFilter: string
  roleFilter: '*' | 'customer' | 'owner'
  rowPerSlide: number
  activeSlide: number
  originalUserList: User[]
  shownUserList: User[]
  numberOfResult: number
  isUpdatingUser: boolean
  updatingUser: User | null

  setFullNameIdFilter: (fullNameIdFilter: string) => void
  setRoleFilter: (roleFilter: '*' | 'customer' | 'owner') => void
  setActiveSlide: (activeSlide: number) => void
  increaseActiveSlide: () => void
  decreaseActiveSlide: () => void
  setOriginalUserList: (originalUserList: User[]) => void
  setShownUserList: () => void
  setIsUpdatingUser: (isUpdatingUser: boolean) => void
  setUpdatingUser: (updatingUser: User | null) => void
}

const useUserStore = create<State>((set, get) => ({
  fullNameIdFilter: '',
  roleFilter: '*',
  rowPerSlide: 10,
  activeSlide: -1,
  originalUserList: [],
  shownUserList: [],
  numberOfResult: 0,
  isUpdatingUser: false,
  updatingUser: null,

  setFullNameIdFilter: (fullNameIdFilter: string) => {
    set({ fullNameIdFilter, activeSlide: 0 })

    get().setShownUserList()
  },
  setRoleFilter(roleFilter: '*' | 'customer' | 'owner') {
    set({ roleFilter, activeSlide: 0 })

    get().setShownUserList()
  },
  setActiveSlide: (activeSlide: number) => {
    set({ activeSlide })

    get().setShownUserList()
  },
  increaseActiveSlide: () => {
    set((state) => ({ activeSlide: state.activeSlide + 1 }))

    get().setShownUserList()
  },
  decreaseActiveSlide: () => {
    set((state) => ({ activeSlide: state.activeSlide - 1 }))

    get().setShownUserList()
  },
  setOriginalUserList: (originalUserList: User[]) => {
    originalUserList = originalUserList.filter((user) => user.role !== 'admin')

    set({ originalUserList })
  },
  setShownUserList() {
    const { originalUserList, fullNameIdFilter, roleFilter, rowPerSlide, activeSlide } = get()

    const filteredList = originalUserList.filter(
      (user) =>
        (user.full_name.includes(fullNameIdFilter) || user.id.toString().includes(fullNameIdFilter)) &&
        (roleFilter === '*' || user.role === roleFilter),
    )

    const shownUserList = filteredList.slice(activeSlide * rowPerSlide, activeSlide * rowPerSlide + rowPerSlide)

    set({ shownUserList, numberOfResult: filteredList.length })
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
