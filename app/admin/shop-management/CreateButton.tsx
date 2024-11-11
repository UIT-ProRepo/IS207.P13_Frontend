'use client'
import React from 'react'
import useShopStore from '../stores/useShopStore'

const CreateButton = () => {
  const setIsCreatingShop = useShopStore((state) => state.setIsCreatingShop)

  return (
    <button onClick={() => setIsCreatingShop(true)} className="button-dark">
      Tạo mới
    </button>
  )
}

export default CreateButton
