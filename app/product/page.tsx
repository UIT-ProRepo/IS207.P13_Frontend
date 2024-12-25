import React from 'react'
import SearchBar from './SearchBar'
import Filter from './Filters'
import Gallery from './Gallery'

const page = () => {
  return (
    <div className="flex flex-col items-center gap-20 xl:gap-28">
      <SearchBar />

      <div className="flex w-full flex-col items-center gap-20 xl:flex-row xl:items-start xl:gap-16">
        <Filter />
        <Gallery />
      </div>
    </div>
  )
}

export default page
