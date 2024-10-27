import React from 'react'
import verticalRectangle2 from './assets/vertical-rectangle-2.png'
import horizontalRectangle2 from './assets/horizontal-rectangle-2.png'
import yellowAsterisk from './assets/yellow-asterisk.svg'
import Image from 'next/image'

const BottomShowcase = () => {
  return (
    <div className="flex flex-col gap-16 xl:gap-28">
      <div className="flex flex-col items-center gap-14 xl:flex-row xl:gap-24 xl:px-16">
        <div className="w-full max-w-lg xl:max-w-none">
          <h2 className="mb-2 capitalize">Thay Đổi Không Gian Sống Từ Nay.</h2>
          <p className="mb-6 !text-dark-opacity-80 text-style-16">
            Đó là câu chuyện về tình yêu vĩnh cửu với không gian sống hoàn hảo. Sự kết hợp giữa nội thất tinh tế và chất
            liệu bền bỉ luôn là nguồn cảm hứng cho chúng tôi.
          </p>
          <button className="button-border-bottom">Khám phá ngay</button>
        </div>

        <div className="relative max-h-fit w-[70vw] max-w-[30rem]">
          <Image
            className="h-full w-full"
            width={verticalRectangle2.width}
            height={verticalRectangle2.height}
            src={verticalRectangle2.src}
            alt="showcase image 3"
          />
          <Image
            className="absolute right-0 top-0 -z-10 -translate-y-1/2 translate-x-1/2 scale-75 xl:scale-100"
            width={yellowAsterisk.width}
            height={yellowAsterisk.height}
            src={yellowAsterisk.src}
            alt="yellow asterisk"
          />
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-14 bg-dark py-16 xl:flex-row xl:gap-24 xl:px-16 xl:py-28">
        <div className="max-h-fit w-[70vw] max-w-[30rem]">
          <Image
            className="h-full w-full"
            width={horizontalRectangle2.width}
            height={horizontalRectangle2.height}
            src={horizontalRectangle2.src}
            alt="showcase image 4"
          />
        </div>

        <div className="w-full max-w-lg xl:max-w-none">
          <h2 className="mb-24 capitalize text-white">Chúng Tôi Cung Cấp Nội Thất Chất Lượng Tuyệt Hảo.</h2>
          <div className="w-1/3 border border-dark-orange"></div>
        </div>

        <Image
          className="absolute bottom-0 right-56 hidden translate-y-1/2 scale-75 xl:block xl:scale-100"
          width={yellowAsterisk.width}
          height={yellowAsterisk.height}
          src={yellowAsterisk.src}
          alt="yellow asterisk"
        />
      </div>
    </div>
  )
}

export default BottomShowcase
