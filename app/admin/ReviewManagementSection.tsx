'use client'
import ROUTES from '@/constants/routes'
import Link from 'next/link'
import React from 'react'
import useGetReviewListQuery from './hooks/useGetReviewListQuery'
import Loading from '@/components/Loading'
import formatTimestamp from '@/utils/formatTimestamp'
import avatarPlaceholder from '@/assets/avatar-placeholder.svg'
import Image from 'next/image'
import RatingStar from '@/components/RatingStar'

const ReviewManagementSection = () => {
  const { data, isLoading } = useGetReviewListQuery()

  const newReviews =
    data
      ?.filter((review) => review.approval_status === 'pending')
      .sort((a, b) => b.id - a.id)
      .slice(0, 5) || []

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="!font-bold text-style-20">Đánh giá mới</p>
        <Link href={ROUTES.ADMIN.REVIEW_MANAGEMENT}>
          <button className="button-border">Đến trang kiểm duyệt đánh giá</button>
        </Link>
      </div>

      <div className="max-w-full overflow-x-scroll no-scrollbar">
        <ul className="flex w-max flex-nowrap gap-28">
          {isLoading ? (
            <Loading />
          ) : newReviews.length > 0 ? (
            newReviews.map((review) => (
              <li key={review.id} className="flex min-h-64 w-[28rem] gap-6 rounded-xl border p-7">
                <div className="flex w-60 flex-col gap-5">
                  <div className="flex gap-4">
                    <div className="aspect-square w-14 rounded-full">
                      <Image
                        className="h-full w-full"
                        width={avatarPlaceholder.width}
                        height={avatarPlaceholder.height}
                        src={avatarPlaceholder.src}
                        alt="avatar"
                      />
                    </div>

                    <div>
                      <p className="!font-medium text-style-20">{review.user.full_name.split(' ').pop()}</p>
                      <p className="text-dark-orange">{formatTimestamp(review.created_at)}</p>
                    </div>
                  </div>

                  <div>
                    <p>{review.comment.length > 100 ? review.comment.slice(0, 50) + '...' : review.comment}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <RatingStar rating={review.rating} size={16} />
                    <p className="!font-medium text-style-18">{review.rating}</p>
                  </div>
                </div>

                <div className="relative grow">
                  <div className="absolute top-1/2 aspect-square w-56 -translate-y-1/2 rounded-full border shadow-lg">
                    <img className="h-full w-full rounded-full" src={review.product.image_url} alt="product" />
                  </div>
                </div>
              </li>
            ))
          ) : (
            <>Không có đánh giá mới</>
          )}
        </ul>
      </div>
    </div>
  )
}

export default ReviewManagementSection
