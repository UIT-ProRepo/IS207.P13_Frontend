import React from 'react'

const StatisticShowcase = () => {
  return (
    <div className="flex flex-col gap-8 bg-dark-orange py-10 xl:flex-row xl:justify-between xl:px-20">
      <div className="flex flex-col items-center">
        <p className="text-white text-style-h2">{'>'} 250</p>
        <p className="text-white text-style-h4">Mẫu mã</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-white text-style-h2">{'>'} 700</p>
        <p className="text-white text-style-h4">Khách hàng mỗi ngày</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-white text-style-h2">18 </p>
        <p className="text-white text-style-h4">Năm kinh nghiệm</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-white text-style-h2">{'>'} 90</p>
        <p className="text-white text-style-h4">Đối tác</p>
      </div>
    </div>
  )
}

export default StatisticShowcase
