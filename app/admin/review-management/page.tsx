import React from 'react'
import Table from './Table'
import FunctionBar from './FunctionBar'

const page = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <FunctionBar />
        <Table />
      </div>
    </>
  )
}

export default page
