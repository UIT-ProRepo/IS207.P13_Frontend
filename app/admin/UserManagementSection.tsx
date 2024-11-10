'use client'
import React from 'react'
import useGetUserListQuery from './hooks/useGetUserListQuery'
import Link from 'next/link'
import ROUTES from '@/constants/routes'
import formatTimestamp from '@/utils/formatTimestamp'
import Loading from '@/components/Loading'

const UserManagementSection = () => {
  const { data, isLoading } = useGetUserListQuery()

  return (
    <div className="flex flex-col gap-4 border p-4">
      <div className="flex items-center justify-between">
        <p className="!font-bold text-style-20">Người dùng mới</p>
        <Link href={ROUTES.ADMIN.USER_MANAGEMENT}>
          <button className="button-border">Đến trang quản lý người dùng</button>
        </Link>
      </div>

      <div className="w-full overflow-x-scroll">
        <table className="table">
          <thead className="bg-dark-orange">
            <tr className="text-left">
              <th>ID</th>
              <th>Thông tin</th>
              <th>Số điện thoại</th>
              <th>Vai trò</th>
              <th>Ngày tham gia</th>
            </tr>
          </thead>
          <tbody className="bg-white [&>tr]:border [&>tr]:border-dark-orange">
            {isLoading ? (
              <tr>
                <td>
                  <Loading />
                </td>
              </tr>
            ) : data ? (
              data
                .sort((a, b) => b.id - a.id)
                .filter((user) => user.role !== 'admin')
                .slice(0, 10)
                .map((user) => (
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
    </div>
  )
}

export default UserManagementSection
