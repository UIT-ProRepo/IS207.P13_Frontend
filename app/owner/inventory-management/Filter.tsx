'use client'
import React from 'react'
import useInventoryStore from './stores/useInventoryStore'
import { useShallow } from 'zustand/shallow'
import useGetCategoryListQuery from './hooks/useGetCategoryListQuery'

const Filter = () => {
  const [nameIdFilter, categoryIdFilter, setNameIdFilter, setCategoryIdFilter] = useInventoryStore(
    useShallow((state) => [
      state.nameIdFilter,
      state.categoryIdFilter,
      state.setNameIdFilter,
      state.setCategoryIdFilter,
    ]),
  )

  const { data, isLoading } = useGetCategoryListQuery()

  const handleNameIdFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameIdFilter(e.target.value)
  }

  const handleIsAliveFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryIdFilter(e.target.value as '*' | number)
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="input-normal"
        placeholder="Tìm tên sản phẩm / ID"
        value={nameIdFilter}
        onChange={handleNameIdFilterChange}
      />

      <select className="input-normal" value={categoryIdFilter} onChange={handleIsAliveFilterChange}>
        <option value="*">Tất cả phân loại</option>
        {data?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Filter
