import { create } from 'zustand'
import type { Product } from '@/types'

type State = {
  nameFilter: string
  categoryIdFilter: '*' | number
  priceFromFilter: number | null
  priceToFilter: number | null
  rowPerSlide: number
  activeSlide: number
  originalProductList: Product[]
  shownProductList: Product[]
  numberOfResult: number

  setNameFilter: (nameFilter: string) => void
  setCategoryIdFilter: (categoryIdFilter: '*' | number) => void
  setPriceFromFilter: (priceFromFilter: number | null) => void
  setPriceToFilter: (priceToFilter: number | null) => void
  setActiveSlide: (activeSlide: number) => void
  increaseActiveSlide: () => void
  decreaseActiveSlide: () => void
  setOriginalProductList: (originalProductList: Product[]) => void
  setShownProductList: () => void
}

const useProductListStore = create<State>((set, get) => ({
  nameFilter: '',
  categoryIdFilter: '*',
  priceFromFilter: null,
  priceToFilter: null,
  rowPerSlide: 6,
  activeSlide: -1,
  originalProductList: [],
  shownProductList: [],
  numberOfResult: 0,

  setNameFilter: (nameFilter: string) => {
    set({ nameFilter, activeSlide: 0 })

    get().setShownProductList()
  },
  setCategoryIdFilter(categoryIdFilter: '*' | number) {
    set({ categoryIdFilter, activeSlide: 0 })

    get().setShownProductList()
  },
  setPriceFromFilter(priceFromFilter: number | null) {
    set({ priceFromFilter, activeSlide: 0 })

    get().setShownProductList()
  },
  setPriceToFilter(priceToFilter: number | null) {
    set({ priceToFilter, activeSlide: 0 })

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
  setOriginalProductList: (originalProductList: Product[]) => {
    set({ originalProductList })
  },
  setShownProductList() {
    const {
      originalProductList,
      nameFilter,
      priceFromFilter,
      priceToFilter,
      categoryIdFilter,
      rowPerSlide,
      activeSlide,
    } = get()

    const filteredList = originalProductList.filter((product: any) => {
      return (
        product.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        (categoryIdFilter === '*' || product.category_id == categoryIdFilter) &&
        (priceFromFilter === null || product.unit_price_original >= priceFromFilter) &&
        (priceToFilter === null || product.unit_price_original <= priceToFilter)
      )
    })

    const shownProductList = filteredList.slice(activeSlide * rowPerSlide, activeSlide * rowPerSlide + rowPerSlide)

    set({ shownProductList, numberOfResult: filteredList.length })
  },
}))

export type { State }
export default useProductListStore
