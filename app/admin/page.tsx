import React from 'react'
import UserManagementSection from './UserManagementSection'
import ReviewManagementSection from './ReviewManagementSection'

const page = () => {
  return (
    <div className="flex flex-col gap-8">
      <UserManagementSection />
      <ReviewManagementSection />
    </div>
  )
}

export default page
