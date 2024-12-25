'use client'
import React from 'react'
import useProductListStore from './stores/useProductListStore'
import { useShallow } from 'zustand/shallow'
import useGetCategoryListQuery from '../owner/inventory-management/hooks/useGetCategoryListQuery'

const Filter = () => {
  const [priceFromFilter, priceToFilter, categoryIdFilter, setPriceFromFilter, setPriceToFilter, setCategoryIdFilter] =
    useProductListStore(
      useShallow((state) => [
        state.priceFromFilter,
        state.priceToFilter,
        state.categoryIdFilter,
        state.setPriceFromFilter,
        state.setPriceToFilter,
        state.setCategoryIdFilter,
      ]),
    )

  const { data, isLoading } = useGetCategoryListQuery()

  const handleCategoryIdFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryIdFilter(e.target.value as '*' | number)
  }

  return (
    <div className="flex w-full max-w-[23rem] flex-col gap-4">
      <label>
        <p className="mb-4 text-style-22">Giá thấp nhất</p>
        <input
          type="number"
          className="input-border-bottom w-full"
          placeholder="Giá từ"
          value={priceFromFilter || ''}
          onChange={(e) => {
            if (e.target.value === '') return setPriceFromFilter(null)
            setPriceFromFilter(parseInt(e.target.value))
          }}
        />
      </label>

      <label>
        <p className="mb-4 text-style-22">Giá cao nhất</p>
        <input
          type="number"
          className="input-border-bottom w-full"
          placeholder="Giá đến"
          value={priceToFilter || ''}
          onChange={(e) => {
            if (e.target.value === '') return setPriceToFilter(null)
            setPriceToFilter(parseInt(e.target.value))
          }}
        />
      </label>

      <label>
        <p className="mb-4 text-style-22">Phân loại</p>
        <select className="input-border-bottom w-full" value={categoryIdFilter} onChange={handleCategoryIdFilterChange}>
          <option value="*">Tất cả phân loại</option>
          {data?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default Filter
