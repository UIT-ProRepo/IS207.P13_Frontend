'use client'
import React from 'react'
import useShopStore from '../stores/useShopStore'
import { useShallow } from 'zustand/shallow'

const Filter = () => {
  const [nameIdFilter, isAliveFilter, setNameIdFilter, setIsAliveFilter] = useShopStore(
    useShallow((state) => [state.nameIdFilter, state.isAliveFilter, state.setNameIdFilter, state.setIsAliveFilter]),
  )

  const handleNameIdFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameIdFilter(e.target.value)
  }

  const handleIsAliveFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsAliveFilter(e.target.value as '*' | 'true' | 'false')
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="input-normal"
        placeholder="Tìm tên cửa hàng / ID"
        value={nameIdFilter}
        onChange={handleNameIdFilterChange}
      />

      <select className="input-normal" value={isAliveFilter} onChange={handleIsAliveFilterChange}>
        <option value="*">Tất cả trạng thái</option>
        <option value="true">Đang hoạt động</option>
        <option value="false">Ngừng hoạt động</option>
      </select>
    </div>
  )
}

export default Filter
