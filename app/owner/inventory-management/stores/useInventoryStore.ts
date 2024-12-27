import { create } from 'zustand'

type State = {
  currentShopId: number
  nameIdFilter: string
  categoryIdFilter: '*' | number
  rowPerSlide: number
  activeSlide: number
  originalProductList: any[]
  shownProductList: any[]
  numberOfResult: number
  isCreatingProduct: boolean
  isUpdatingProduct: boolean
  updatingProduct: any | null
  isUpdatingIsDeleted: boolean

  setCurrentShopId: (currentShopId: number) => void
  setNameIdFilter: (nameIdFilter: string) => void
  setCategoryIdFilter: (categoryIdFilter: '*' | number) => void
  setActiveSlide: (activeSlide: number) => void
  increaseActiveSlide: () => void
  decreaseActiveSlide: () => void
  setOriginalProductList: (originalProductList: any[]) => void
  setShownProductList: () => void
  setIsCreatingProduct: (isCreatingProduct: boolean) => void
  setIsUpdatingProduct: (isUpdatingProduct: boolean) => void
  setUpdatingProduct: (updatingProduct: any | null) => void
  setIsUpdatingIsDeleted: (isUpdatingIsDeleted: boolean) => void
}

const useInventoryStore = create<State>((set, get) => ({
  currentShopId: 0,
  nameIdFilter: '',
  categoryIdFilter: '*',
  rowPerSlide: 10,
  activeSlide: -1,
  originalProductList: [],
  shownProductList: [],
  numberOfResult: 0,
  isCreatingProduct: false,
  isUpdatingProduct: false,
  updatingProduct: null,
  isUpdatingIsDeleted: false,

  setCurrentShopId: (currentShopId: number) => {
    set({ currentShopId })
  },
  setNameIdFilter: (nameIdFilter: string) => {
    set({ nameIdFilter, activeSlide: 0 })

    get().setShownProductList()
  },
  setCategoryIdFilter(categoryIdFilter: '*' | number) {
    set({ categoryIdFilter, activeSlide: 0 })

    get().setShownProductList()
  },
  setActiveSlide: (activeSlide: number) => {
    set({ activeSlide })

    get().setShownProductList()
  },
  increaseActiveSlide: () => {
    set((state) => ({ activeSlide: state.activeSlide + 1 }))

    get().setShownProductList()
  },
  decreaseActiveSlide: () => {
    set((state) => ({ activeSlide: state.activeSlide - 1 }))

    get().setShownProductList()
  },
  setOriginalProductList: (originalProductList: any[]) => {
    set({ originalProductList })
  },
  setShownProductList() {
    const { originalProductList, nameIdFilter, categoryIdFilter, rowPerSlide, activeSlide } = get()

    const filteredList = originalProductList.filter(
      (product) =>
        (product.name.toLowerCase().includes(nameIdFilter.toLowerCase()) ||
          product.id.toString().includes(nameIdFilter)) &&
        (categoryIdFilter === '*' || product.category_id == categoryIdFilter),
    )

    const shownProductList = filteredList.slice(activeSlide * rowPerSlide, activeSlide * rowPerSlide + rowPerSlide)

    set({ shownProductList, numberOfResult: filteredList.length })
  },
  setIsCreatingProduct: (isCreatingProduct: boolean) => {
    set({ isCreatingProduct })
  },
  setIsUpdatingProduct: (isUpdatingProduct: boolean) => {
    set({ isUpdatingProduct })
  },
  setUpdatingProduct: (updatingProduct: any | null) => {
    set({ updatingProduct })
  },
  setIsUpdatingIsDeleted: (isUpdatingIsDeleted: boolean) => {
    set({ isUpdatingIsDeleted })
  },
}))

export type { State }
export default useInventoryStore
