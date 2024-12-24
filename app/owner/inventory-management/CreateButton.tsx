'use client'
import React from 'react'
import useInventoryStore from './stores/useInventoryStore'

const CreateButton = () => {
  const setIsCreatingProduct = useInventoryStore((state) => state.setIsCreatingProduct)

  return (
    <button
      onClick={() => {
        console.log('Creating new product')
        setIsCreatingProduct(true)
      }}
      className="button-dark"
    >
      Tạo mới
    </button>
  )
}

export default CreateButton
