import ROUTES from '@/constants/routes'
import Link from 'next/link'
import React from 'react'

const ReviewManagementSection = () => {
  return (
    <div className="flex flex-col gap-4 border p-4">
      <div className="flex items-center justify-between">
        <p className="!font-bold text-style-20">Đánh giá mới</p>
        <Link href={ROUTES.ADMIN.REVIEW_MANAGEMENT}>
          <button className="button-border">Đến trang kiểm duyệt đánh giá</button>
        </Link>
      </div>

      <div className="w-full overflow-x-scroll no-scrollbar"></div>
    </div>
  )
}

export default ReviewManagementSection
