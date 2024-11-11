import React from 'react'
import CreateButton from './CreateButton'
import Filter from './Filter'
import Pagination from './Pagination'

const FunctionBar = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-y-4">
      <Pagination />

      <Filter />

      <CreateButton />
    </div>
  )
}

export default FunctionBar
