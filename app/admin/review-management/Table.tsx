'use client'
import React, { useEffect } from 'react'
import useGetReviewListQuery from '../hooks/useGetReviewListQuery'
import useReviewStore from '../stores/useReviewStore'
import Loading from '@/components/Loading'
import formatTimestamp from '@/utils/formatTimestamp'
import { useShallow } from 'zustand/shallow'
import useUpdateApprovalStatusMutation from '../hooks/useUpdateApprovalStatusMutation'

const Table = () => {
  const { data, isLoading } = useGetReviewListQuery()
  const updateApprovalStatusMutation = useUpdateApprovalStatusMutation()
  const [setOriginalReviewList, setActiveSlide, shownReviewList] = useReviewStore(
    useShallow((state) => [state.setOriginalReviewList, state.setActiveSlide, state.shownReviewList]),
  )

  useEffect(() => {
    if (data) {
      setOriginalReviewList(data)
      setActiveSlide(0)
    }
  }, [data, setOriginalReviewList, setActiveSlide])

  const handleChangeApprovalStatus = (e: React.ChangeEvent<HTMLSelectElement>, reviewId: number) => {
    updateApprovalStatusMutation.mutate({
      reviewId,
      data: { approval_status: e.target.value as 'pending' | 'approved' | 'rejected' },
    })
  }

  return (
    <div className="w-full overflow-x-scroll no-scrollbar">
      <table className="table">
        <thead className="bg-dark-orange">
          <tr className="text-left">
            <th>ID</th>
            <th>Người dùng</th>
            <th>Sản phẩm</th>
            <th>Đánh giá</th>
            <th>Bình luận</th>
            <th>Ngày đánh giá</th>
            <th>Trạng thái duyệt</th>
          </tr>
        </thead>
        <tbody className="bg-white [&>tr]:border [&>tr]:border-dark-orange">
          {isLoading ? (
            <tr>
              <td>
                <Loading />
              </td>
            </tr>
          ) : shownReviewList ? (
            shownReviewList.map((review) => (
              <tr key={review.id}>
                <td className="font-bold">{review.id}</td>
                <td>
                  <span className="font-bold">{review.user.full_name}</span>
                  <br />
                  {review.user.email}
                </td>
                <td>{review.product.name}</td>
                <td>{review.rating} / 5</td>
                <td>{review.comment}</td>
                <td>{formatTimestamp(review.created_at)}</td>
                <td>
                  <select
                    defaultValue={review.approval_status}
                    className="input-normal"
                    onChange={(e) => handleChangeApprovalStatus(e, review.id)}
                  >
                    <option value="pending">Chờ duyệt</option>
                    <option value="approved">Đã duyệt</option>
                    <option value="rejected">Từ chối</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
