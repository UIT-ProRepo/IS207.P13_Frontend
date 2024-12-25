'use client'
import React from 'react'
import useProductListStore from './stores/useProductListStore'
import { useShallow } from 'zustand/shallow'

const SearchBar = () => {
  const [nameFilter, setNameFilter] = useProductListStore(
    useShallow((state) => [state.nameFilter, state.setNameFilter]),
  )

  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value)
  }

  return (
    <input
      type="search"
      className="border-bg-dark-orange w-full max-w-[23rem] rounded-3xl border-2 px-4 py-3 text-style-18 placeholder:text-style-18 xl:max-w-[38rem] xl:px-6 xl:py-4 xl:text-style-24 placeholder:xl:text-style-24"
      placeholder="Tìm tên sản phẩm"
      value={nameFilter}
      onChange={handleNameFilterChange}
    />
  )
}

export default SearchBar
