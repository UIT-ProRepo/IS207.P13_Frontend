import React from 'react'
import circle from './assets/circle.png'
import Image from 'next/image'
import verticalRectangle from './assets/vertical-rectangle.png'
import horizontalRectangle from './assets/horizontal-rectangle.png'
import yellowStar from './assets/yellow-star.svg'
import yellowSpiralArrow from './assets/yellow-spiral-arrow.svg'
import yellowBlast from './assets/yellow-blast.svg'
import darkOrangeStar from './assets/dark-orange-star.svg'

const TopShowcase = () => {
  return (
    <div className="flex flex-col gap-16 xl:gap-28 xl:px-16">
      <div className="flex flex-col items-center gap-14 xl:flex-row xl:gap-24">
        <div className="w-full max-w-lg xl:max-w-none">
          <h1 className="mb-2 capitalize">Đem Lại Nơi Sống Ấm Cúng và Đẹp Đẽ.</h1>
          <p className="!text-dark-opacity-80 text-style-16">
            Nội thất của chúng tôi kết nối các gia đình, mang đến không gian ấm áp để lưu giữ những kỷ niệm đẹp.
          </p>
        </div>
        <div className="aspect-square w-[70vw] max-w-[30rem] rounded-full">
          <Image
            className="h-full w-full"
            width={circle.width}
            height={circle.height}
            src={circle.src}
            alt="showcase image 1"
            priority
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-14 xl:flex-row xl:gap-24">
        <div className="w-full max-w-lg xl:order-2 xl:max-w-none">
          <h2 className="mb-2 capitalize">Nội Thất Chất Lượng, Thiết Kế Sang Trọng Cho Mọi Ngôi Nhà.</h2>
          <p className="mb-6 !text-dark-opacity-80 text-style-16">
            Chúng tôi cung cấp các sản phẩm nội thất chất lượng, giúp nâng cao vẻ đẹp và tiện nghi cho không gian sống
            của bạn. Hãy để chúng tôi biến ngôi nhà của bạn thành một nơi ấm cúng và phong cách.
          </p>
          <button className="button-border-bottom">Tìm hiểu thêm</button>
        </div>
        <div className="relative max-h-fit w-[70vw] max-w-[30rem] xl:order-1">
          <Image
            className="h-full w-full"
            width={verticalRectangle.width}
            height={verticalRectangle.height}
            src={verticalRectangle.src}
            alt="showcase image 2"
          />
          <Image
            className="absolute left-0 top-0 -z-10 -translate-x-1/2 -translate-y-1/2 scale-75 xl:scale-100"
            width={yellowStar.width}
            height={yellowStar.height}
            src={yellowStar}
            alt="yellow star"
          />
          <Image
            className="absolute bottom-16 right-0 translate-x-1/2 translate-y-1/2 scale-75 xl:scale-100"
            width={yellowSpiralArrow.width}
            height={yellowSpiralArrow.height}
            src={yellowSpiralArrow}
            alt="yellow spiral arrow"
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-14 xl:flex-row xl:gap-24">
        <div className="w-full max-w-lg xl:max-w-none">
          <h2 className="mb-2 capitalize">Khám Phá Những Sản Phẩm Nội Thất Cao Cấp.</h2>
          <p className="mb-6 !text-dark-opacity-80 text-style-16">
            Đặt mua trực tuyến nội thất của chúng tôi tại đây.
            <br />
            ✓ Giao hàng tận nhà tiện lợi.
            <br />✓ Phương thức thanh toán an toàn, dễ dàng.
          </p>
          <button className="button-border-bottom">Đặt ngay</button>
        </div>
        <div className="relative max-h-fit w-[70vw] max-w-[30rem]">
          <Image
            className="h-full w-full"
            width={horizontalRectangle.width}
            height={horizontalRectangle.height}
            src={horizontalRectangle.src}
            alt="showcase image 3"
          />
          <Image
            className="absolute bottom-0 left-0 -z-10 -translate-x-1/2 translate-y-1/2 scale-75 xl:scale-100"
            width={yellowBlast.width}
            height={yellowBlast.height}
            src={yellowBlast}
            alt="yellow blast"
          />
          <Image
            className="absolute right-0 top-16 -translate-y-1/2 translate-x-1/2 scale-75 xl:scale-100"
            width={darkOrangeStar.width}
            height={darkOrangeStar.height}
            src={darkOrangeStar}
            alt="dark orange star"
          />
        </div>
      </div>
    </div>
  )
}

export default TopShowcase
