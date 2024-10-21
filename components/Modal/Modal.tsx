import React, { ReactNode } from 'react'

const Modal = ({ children }: { children?: ReactNode }) => {
  return <div className="w-full max-w-[32rem] rounded-2xl bg-[#EDF2F9] p-6 xl:p-8">{children}</div>
}

export default Modal
