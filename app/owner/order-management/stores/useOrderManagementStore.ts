import { create } from 'zustand'

type State = {
  currentShopId: number
  deliveryStatusFilter: '*' | 'Pending' | 'Success' | 'Fail'
  rowPerSlide: number
  activeSlide: number
  originalOrderList: any[]
  shownOrderList: any[]
  numberOfResult: number

  setCurrentShopId: (currentShopId: number) => void
  setDeliveryStatusFilter: (deliveryStatusFilter: '*' | 'Pending' | 'Success' | 'Fail') => void
  setActiveSlide: (activeSlide: number) => void
  increaseActiveSlide: () => void
  decreaseActiveSlide: () => void
  setOriginalOrderList: (originalOrderList: any[]) => void
  setShownOrderList: () => void
}

const useOrderManagementStore = create<State>((set, get) => ({
  currentShopId: 0,
  deliveryStatusFilter: '*',
  rowPerSlide: 10,
  activeSlide: -1,
  originalOrderList: [],
  shownOrderList: [],
  numberOfResult: 0,

  setCurrentShopId: (currentShopId: number) => {
    set({ currentShopId })
  },
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
  setOriginalOrderList: (originalOrderList: any[]) => {
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
export default useOrderManagementStore
