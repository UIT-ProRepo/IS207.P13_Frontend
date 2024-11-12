'use client'
import React from 'react'
import useReviewStore from '../stores/useReviewStore'
import { useShallow } from 'zustand/shallow'

const Filter = () => {
  const [idFilter, ratingFilter, approvalStatusFilter, setIdFilter, setRatingFilter, setApprovalStatusFilter] =
    useReviewStore(
      useShallow((state) => [
        state.idFilter,
        state.ratingFilter,
        state.approvalStatusFilter,
        state.setIdFilter,
        state.setRatingFilter,
        state.setApprovalStatusFilter,
      ]),
    )

  const handleIdFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdFilter(e.target.value)
  }

  const handleApprovalStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setApprovalStatusFilter(e.target.value as '*' | 'pending' | 'approved' | 'rejected')
  }

  const handleRatingFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRatingFilter(e.target.value as '*' | '1' | '2' | '3' | '4' | '5')
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="input-normal"
        placeholder="Tìm ID"
        value={idFilter}
        onChange={handleIdFilterChange}
      />

      <select className="input-normal" value={ratingFilter} onChange={handleRatingFilterChange}>
        <option value="*">Tất cả đánh giá</option>
        <option value="1">1 / 5</option>
        <option value="2">2 / 5</option>
        <option value="3">3 / 5</option>
        <option value="4">4 / 5</option>
        <option value="5">5 / 5</option>
      </select>

      <select className="input-normal" value={approvalStatusFilter} onChange={handleApprovalStatusFilterChange}>
        <option value="*">Tất cả trạng thái</option>
        <option value="pending">Chờ duyệt</option>
        <option value="approved">Đã duyệt</option>
        <option value="rejected">Từ chối</option>
      </select>
    </div>
  )
}

export default Filter
