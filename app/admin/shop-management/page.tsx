import React from 'react'
import Table from './Table'
import FunctionBar from './FunctionBar'
import UpdateModal from './UpdateModal'
import CreateModal from './CreateModal'
import UpdateIsAliveModal from './UpdateIsAliveModal'

const page = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <FunctionBar />
        <Table />
      </div>

      <CreateModal />
      <UpdateIsAliveModal />
      <UpdateModal />
    </>
  )
}

export default page
