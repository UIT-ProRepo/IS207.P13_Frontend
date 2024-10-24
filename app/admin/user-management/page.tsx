import React from 'react'
import Table from './Table'
import FunctionBar from './FunctionBar'
import UpdateModal from './UpdateModal'

const page = () => {
  return (
    <>
      <div className="page-content flex flex-col gap-4">
        <FunctionBar />
        <Table />
      </div>

      <UpdateModal />
    </>
  )
}

export default page
