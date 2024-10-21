import Image, { StaticImageData } from 'next/image'
import React from 'react'

const ImageContainer = ({
  image,
  alt,
  width,
  height,
  customClass,
}: {
  image: StaticImageData
  alt: string
  width?: number
  height?: number
  customClass?: string
}) => {
  return (
    <div className={`${width ? `w-${width}` : ''} ${height ? `w-${height}` : ''} ${customClass}`}>
      <Image className="max-h-full max-w-full" width={image.width} height={image.height} src={image.src} alt={alt} />
    </div>
  )
}

export default ImageContainer
