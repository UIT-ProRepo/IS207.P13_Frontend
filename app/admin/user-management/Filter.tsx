'use client'
import React from 'react'
import useUserStore from '../stores/useUserStore'
import { useShallow } from 'zustand/shallow'

const Filter = () => {
  const [fullNameIdFilter, roleFilter, setFullNameIdFilter, setRoleFilter] = useUserStore(
    useShallow((state) => [state.fullNameIdFilter, state.roleFilter, state.setFullNameIdFilter, state.setRoleFilter]),
  )

  const handleFullNameIdFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullNameIdFilter(e.target.value)
  }

  const handleRoleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(e.target.value as '*' | 'customer' | 'owner')
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="input-normal"
        placeholder="Tìm họ tên / ID"
        value={fullNameIdFilter}
        onChange={handleFullNameIdFilterChange}
      />

      <select className="input-normal" value={roleFilter} onChange={handleRoleFilterChange}>
        <option value="*">Tất cả vai trò</option>
        <option value="customer">Customer</option>
        <option value="owner">Owner</option>
      </select>
    </div>
  )
}

export default Filter
