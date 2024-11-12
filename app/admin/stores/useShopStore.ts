import { create } from 'zustand'
import type { Address, Shop } from '@/types'

type State = {
  nameIdFilter: string
  isAliveFilter: '*' | 'true' | 'false'
  rowPerSlide: number
  activeSlide: number
  originalShopList: (Shop & { address: Address })[]
  shownShopList: (Shop & { address: Address })[]
  numberOfResult: number
  isCreatingShop: boolean
  isUpdatingShop: boolean
  updatingShop: (Shop & { address: Address }) | null
  isUpdatingIsAlive: boolean

  setNameIdFilter: (nameIdFilter: string) => void
  setIsAliveFilter: (isAliveFilter: '*' | 'true' | 'false') => void
  setActiveSlide: (activeSlide: number) => void
  increaseActiveSlide: () => void
  decreaseActiveSlide: () => void
  setOriginalShopList: (originalShopList: (Shop & { address: Address })[]) => void
  setShownShopList: () => void
  setIsCreatingShop: (isCreatingShop: boolean) => void
  setIsUpdatingShop: (isUpdatingShop: boolean) => void
  setUpdatingShop: (updatingShop: (Shop & { address: Address }) | null) => void
  setIsUpdatingIsAlive: (isUpdatingIsAlive: boolean) => void
}

const useShopStore = create<State>((set, get) => ({
  nameIdFilter: '',
  isAliveFilter: '*',
  rowPerSlide: 10,
  activeSlide: -1,
  originalShopList: [],
  shownShopList: [],
  numberOfResult: 0,
  isCreatingShop: false,
  isUpdatingShop: false,
  updatingShop: null,
  isUpdatingIsAlive: false,

  setNameIdFilter: (nameIdFilter: string) => {
    set({ nameIdFilter, activeSlide: 0 })

    get().setShownShopList()
  },
  setIsAliveFilter: (isAliveFilter: '*' | 'true' | 'false') => {
    set({ isAliveFilter, activeSlide: 0 })

    get().setShownShopList()
  },
  setActiveSlide: (activeSlide: number) => {
    set({ activeSlide })

    get().setShownShopList()
  },
  increaseActiveSlide: () => {
    set((state) => ({ activeSlide: state.activeSlide + 1 }))

    get().setShownShopList()
  },
  decreaseActiveSlide: () => {
    set((state) => ({ activeSlide: state.activeSlide - 1 }))

    get().setShownShopList()
  },
  setOriginalShopList: (originalShopList: (Shop & { address: Address })[]) => {
    set({ originalShopList })
  },
  setShownShopList() {
    const { originalShopList, nameIdFilter, isAliveFilter, rowPerSlide, activeSlide } = get()

    const filteredList = originalShopList.filter(
      (shop) =>
        (shop.name.toLowerCase().includes(nameIdFilter.toLowerCase()) || shop.id.toString().includes(nameIdFilter)) &&
        (isAliveFilter === '*' || shop.is_alive === (isAliveFilter === 'true')),
    )

    const shownShopList = filteredList.slice(activeSlide * rowPerSlide, activeSlide * rowPerSlide + rowPerSlide)

    set({ shownShopList, numberOfResult: filteredList.length })
  },
  setIsCreatingShop: (isCreatingShop: boolean) => {
    set({ isCreatingShop })
  },
  setIsUpdatingShop: (isUpdatingShop: boolean) => {
    set({ isUpdatingShop })
  },
  setUpdatingShop: (updatingShop: (Shop & { address: Address }) | null) => {
    set({ updatingShop })
  },
  setIsUpdatingIsAlive: (isUpdatingIsAlive: boolean) => {
    set({ isUpdatingIsAlive })
  },
}))

export type { State }
export default useShopStore
