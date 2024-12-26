import { create } from 'zustand'
import type { Order } from '@/types'

type State = {
  deliveryStatusFilter: '*' | 'Pending' | 'Success' | 'Fail'
  rowPerSlide: number
  activeSlide: number
  originalOrderList: Order[]
  shownOrderList: Order[]
  numberOfResult: number

  setDeliveryStatusFilter: (deliveryStatusFilter: '*' | 'Pending' | 'Success' | 'Fail') => void
  setActiveSlide: (activeSlide: number) => void
  increaseActiveSlide: () => void
  decreaseActiveSlide: () => void
  setOriginalOrderList: (originalOrderList: Order[]) => void
  setShownOrderList: () => void
}

const useOrderHistoryStore = create<State>((set, get) => ({
  deliveryStatusFilter: '*',
  rowPerSlide: 4,
  activeSlide: -1,
  originalOrderList: [],
  shownOrderList: [],
  numberOfResult: 0,

  setDeliveryStatusFilter: (deliveryStatusFilter: '*' | 'Pending' | 'Success' | 'Fail') => {
    set({ deliveryStatusFilter })

    get().setShownOrderList()
  },
  setActiveSlide: (activeSlide: number) => {
    set({ activeSlide })

    get().setShownOrderList()
  },
  increaseActiveSlide: () => {
    set((state) => ({ activeSlide: state.activeSlide + 1 }))

    get().setShownOrderList()
  },
  decreaseActiveSlide: () => {
    set((state) => ({ activeSlide: state.activeSlide - 1 }))

    get().setShownOrderList()
  },
  setOriginalOrderList: (originalOrderList: Order[]) => {
    set({ originalOrderList })
  },
  setShownOrderList() {
    const { originalOrderList, deliveryStatusFilter, rowPerSlide, activeSlide } = get()

    const filteredList = originalOrderList.filter(
      (order) => deliveryStatusFilter === '*' || order.delivery_status === deliveryStatusFilter,
    )

    const shownOrderList = filteredList.slice(activeSlide * rowPerSlide, activeSlide * rowPerSlide + rowPerSlide)

    set({ shownOrderList, numberOfResult: filteredList.length })
  },
}))

export type { State }
export default useOrderHistoryStore
