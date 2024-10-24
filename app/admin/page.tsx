import React from 'react'
import UserManagementSection from './UserManagementSection'

const page = () => {
  return (
    <div className="page-content flex flex-col gap-8">
      <p className="!font-bold text-style-20">Bảng điều khiển</p>
      <UserManagementSection />
      <div></div>
    </div>
  )
}

export default page
