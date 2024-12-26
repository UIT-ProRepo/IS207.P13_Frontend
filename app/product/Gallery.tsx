'use client'
import React, { useEffect } from 'react'
import useGetProductListQuery from './hooks/useGetProductListQuery'
import useInventoryStore from './stores/useProductListStore'
import Loading from '@/components/Loading'
import { useShallow } from 'zustand/shallow'
import Link from 'next/link'
import productPlaceholder from '@/assets/product-placeholder.png'
import Pagination from './Pagination'

const Gallery = () => {
  const [setOriginalProductList, setActiveSlide, shownProductList] = useInventoryStore(
    useShallow((state) => [state.setOriginalProductList, state.setActiveSlide, state.shownProductList]),
  )

  const { data, isLoading } = useGetProductListQuery()

  useEffect(() => {
    if (data) {
      setOriginalProductList(data)
      setActiveSlide(0)
    }
  }, [data, setOriginalProductList, setActiveSlide])

  return (
    <div className="flex flex-col gap-20">
      <div className="grid grow grid-cols-1 justify-items-center gap-20 overflow-x-scroll no-scrollbar lg:grid-cols-2">
        {isLoading ? (
          <div className="col-span-full flex w-full justify-center">
            <Loading />
          </div>
        ) : shownProductList.length > 0 ? (
          shownProductList.map((product) => (
            <div key={product.id} className="w-full max-w-[23rem]">
              <Link href={`/product/${product.id}`}>
                <div className="mb-4 aspect-square">
                  <img
                    className="h-full w-full"
                    src={product.image_url || productPlaceholder.src}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src = productPlaceholder.src
                    }}
                  />
                </div>

                <p className="text-style-24">{product.name}</p>
                <p className="text-style-16">Mã: {product.id}</p>

                <hr className="my-6 h-[1px] bg-dark-orange" />

                <div className="flex justify-between">
                  <button className="button-border-bottom text-style-16">Mua ngay</button>

                  <p className="text-style-24">{product.unit_price.toLocaleString()}đ</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="flex justify-center">Không có sản phẩm nào</div>
        )}
      </div>

      <Pagination />
    </div>
  )
}

export default Gallery
