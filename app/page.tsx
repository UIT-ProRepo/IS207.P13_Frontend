import React from 'react'
import TopShowcase from './TopShowcase'
import StatisticShowcase from './StatisticShowcase'
import BottomShowcase from './BottomShowcase'

const page = () => {
  return (
    <div className="page-content flex flex-col gap-20">
      <TopShowcase />
      <StatisticShowcase />
      <BottomShowcase />
    </div>
  )
}

export default page
