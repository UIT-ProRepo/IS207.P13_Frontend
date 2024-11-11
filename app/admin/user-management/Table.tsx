'use client'
import React, { useEffect } from 'react'
import useGetUserListQuery from '../hooks/useGetUserListQuery'
import useUserStore from '../stores/useUserStore'
import Loading from '@/components/Loading'
import formatTimestamp from '@/utils/formatTimestamp'
import { useShallow } from 'zustand/shallow'

const Table = () => {
  const { data, isLoading } = useGetUserListQuery()
  const [setOriginalUserList, setActiveSlide, shownUserList, setIsUpdatingUser, setUpdatingUser] = useUserStore(
    useShallow((state) => [
      state.setOriginalUserList,
      state.setActiveSlide,
      state.shownUserList,
      state.setIsUpdatingUser,
      state.setUpdatingUser,
    ]),
  )

  useEffect(() => {
    if (data) {
      setOriginalUserList(data)
      setActiveSlide(0)
    }
  }, [data, setOriginalUserList, setActiveSlide])

  return (
    <div className="w-full overflow-x-scroll">
      <table className="table">
        <thead className="bg-dark-orange">
          <tr className="text-left">
            <th>ID</th>
            <th>Thông tin</th>
            <th>Số điện thoại</th>
            <th>Vai trò</th>
            <th>Ngày tham gia</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="bg-white [&>tr]:border [&>tr]:border-dark-orange">
          {isLoading ? (
            <tr>
              <td>
                <Loading />
              </td>
            </tr>
          ) : shownUserList ? (
            shownUserList.map((user) => (
              <tr key={user.id}>
                <td className="font-bold">{user.id}</td>
                <td>
                  <span className="font-bold">{user.full_name}</span>
                  <br />
                  {user.email}
                </td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>{formatTimestamp(user.created_at)}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsUpdatingUser(true)
                      setUpdatingUser(user)
                    }}
                    className="button-border"
                  >
                    Sửa
                  </button>
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
