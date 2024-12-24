import React from 'react'
import Table from './Table'
import FunctionBar from './FunctionBar'
import ShopSelect from './ShopSelect'
import UpdateModal from './UpdateModal'
import CreateModal from './CreateModal'
import UpdateIsDeletedModal from './UpdateIsDeletedModal'

const page = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <ShopSelect />
        <FunctionBar />
        <Table />
      </div>

      <CreateModal />
      <UpdateIsDeletedModal />
      <UpdateModal />
    </>
  )
}

export default page
