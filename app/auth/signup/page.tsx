import React from 'react'
import authImage from '@/assets/auth.png'
import SignupModal from './SignupModal'
import ImageContainer from '@/components/ImageContainer'

const page = () => {
  return (
    <div className="page-content flex flex-col items-center gap-2 xl:flex-row-reverse xl:justify-center xl:gap-14">
      <ImageContainer image={authImage} alt="login" customClass="h-fit w-fit max-w-[32rem]" />
      <SignupModal />
    </div>
  )
}

export default page
