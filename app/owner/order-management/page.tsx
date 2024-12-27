import React from 'react'
import ShopSelect from './ShopSelect'
import FunctionBar from './FunctionBar'
import Table from './Table'

const page = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <ShopSelect />
        <FunctionBar />
        <Table />
      </div>
    </>
  )
}

export default page
