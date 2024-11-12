import { create } from 'zustand'
import type { Product, Review, User } from '@/types'

type State = {
  idFilter: string
  ratingFilter: '*' | '1' | '2' | '3' | '4' | '5'
  approvalStatusFilter: '*' | 'pending' | 'approved' | 'rejected'
  rowPerSlide: number
  activeSlide: number
  originalReviewList: (Review & { product: Product; user: User })[]
  shownReviewList: (Review & { product: Product; user: User })[]
  numberOfResult: number

  setIdFilter: (idFilter: string) => void
  setRatingFilter: (ratingFilter: '*' | '1' | '2' | '3' | '4' | '5') => void
  setApprovalStatusFilter: (approvalStatusFilter: '*' | 'pending' | 'approved' | 'rejected') => void
  setActiveSlide: (activeSlide: number) => void
  increaseActiveSlide: () => void
  decreaseActiveSlide: () => void
  setOriginalReviewList: (originalReviewList: (Review & { product: Product; user: User })[]) => void
  setShownReviewList: () => void
}

const useReviewStore = create<State>((set, get) => ({
  idFilter: '',
  ratingFilter: '*',
  approvalStatusFilter: '*',
  rowPerSlide: 10,
  activeSlide: -1,
  originalReviewList: [],
  shownReviewList: [],
  numberOfResult: 0,

  setIdFilter: (idFilter: string) => {
    set({ idFilter, activeSlide: 0 })

    get().setShownReviewList()
  },
  setRatingFilter: (ratingFilter: '*' | '1' | '2' | '3' | '4' | '5') => {
    set({ ratingFilter, activeSlide: 0 })

    get().setShownReviewList()
  },
  setApprovalStatusFilter: (approvalStatusFilter: '*' | 'pending' | 'approved' | 'rejected') => {
    set({ approvalStatusFilter, activeSlide: 0 })

    get().setShownReviewList()
  },
  setActiveSlide: (activeSlide: number) => {
    set({ activeSlide })

    get().setShownReviewList()
  },
  increaseActiveSlide: () => {
    set((state) => ({ activeSlide: state.activeSlide + 1 }))

    get().setShownReviewList()
  },
  decreaseActiveSlide: () => {
    set((state) => ({ activeSlide: state.activeSlide - 1 }))

    get().setShownReviewList()
  },
  setOriginalReviewList: (originalReviewList: (Review & { product: Product; user: User })[]) => {
    set({ originalReviewList })
  },
  setShownReviewList() {
    const { originalReviewList, rowPerSlide, activeSlide } = get()

    const filteredList = originalReviewList.filter(
      (review) =>
        (review.id.toString().includes(get().idFilter) || get().idFilter === '') &&
        (get().ratingFilter === '*' || review.rating.toString() === get().ratingFilter) &&
        (get().approvalStatusFilter === '*' || review.approval_status === get().approvalStatusFilter),
    )

    const shownReviewList = filteredList.slice(activeSlide * rowPerSlide, activeSlide * rowPerSlide + rowPerSlide)

    set({ shownReviewList, numberOfResult: filteredList.length })
  },
}))

export type { State }
export default useReviewStore
