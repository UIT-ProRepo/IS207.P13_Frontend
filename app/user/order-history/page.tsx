import React from 'react'
import Filter from './Filter'
import List from './List'
import Pagination from './Pagination'

const page = () => {
  return (
    <div className="flex flex-col gap-12">
      <Filter />

      <List />

      <Pagination />
    </div>
  )
}

export default page
