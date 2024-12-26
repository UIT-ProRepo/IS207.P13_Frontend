/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Product } from '../../../types/Product'
import { Review } from '../../../types/Review'
import useGetProductListQuery from '../hooks/useGetProductListQuery'
import useGetProductQuery from '../hooks/useGetProductQuery'
import Loading from '@/components/Loading'
import { useCart } from '@/app/user/cart/hooks/useCart'
import { toast } from 'react-toastify'

// Mock data
interface RelatedProduct {
  id: number
  name: string
  image_url: string
}

const handleAddToCart = () => {}

const mockProducts: any = {
  id: 23,
  shop_id: 3,
  category_id: 2,
  name: 'Kệ Sách Line',
  unit_price: 27690000,
  description:
    'Kệ sách Line: Tạo điểm nhấn hiện đại cho không gian với kệ sách Line màu trắng tinh tế, thiết kế tối giản, giúp bạn sắp xếp sách và đồ vật gọn gàng.',
  image_url: 'https://nhaxinh.com/wp-content/uploads/2022/12/KE-SACH-LINE-MAU-BRONZE-1.jpg',
  is_deleted: false,
  quantity: 8,
  createdAt: '2024-11-07 10:28:24',
  updatedAt: '2024-11-07 10:28:24',
}

const mockReviews: Review[] = [
  {
    id: 1,
    user_id: 25,
    product_id: 23,
    rating: 4,
    comment: 'Kệ sách thiết kế đẹp, nhưng giá hơi cao.',
    approval_status: 'approved',
    created_at: '2024-11-07 10:39:49',
    updated_at: '2024-11-07 10:39:49',
  },
  {
    id: 2,
    user_id: 26,
    product_id: 23,
    rating: 5,
    comment: 'Rất đẹp và chắc chắn!',
    approval_status: 'approved',
    created_at: '2024-11-08 12:15:10',
    updated_at: '2024-11-08 12:15:10',
  },
  {
    id: 3,
    user_id: 27,
    product_id: 23,
    rating: 3,
    comment: 'Thiết kế ổn nhưng chưa hoàn hảo.',
    approval_status: 'approved',
    created_at: '2024-11-09 14:20:30',
    updated_at: '2024-11-09 14:20:30',
  },
  {
    id: 4,
    user_id: 28,
    product_id: 23,
    rating: 5,
    comment: 'Rất thích sản phẩm này!',
    approval_status: 'approved',
    created_at: '2024-11-10 10:05:10',
    updated_at: '2024-11-10 10:05:10',
  },
]

const mockRelatedProducts: RelatedProduct[] = [
  {
    id: 24,
    name: 'Kệ Coastal',
    image_url: 'https://nhaxinh.com/wp-content/uploads/2022/06/KE-SACH-HANGAR-BLACK-H200-3.jpg',
  },
  {
    id: 25,
    name: 'Kệ Sách Iris',
    image_url: 'https://nhaxinh.com/wp-content/uploads/2021/10/ke-sach-iris-1.jpg',
  },
  {
    id: 26,
    name: 'Kệ Treo Artigo',
    image_url: 'https://nhaxinh.com/wp-content/uploads/2021/10/nha-xinh-ke-treo-cico.jpg',
  },
  {
    id: 27,
    name: 'Kệ Treo Inside',
    image_url: 'https://nhaxinh.com/wp-content/uploads/2021/10/ke-treo-3-80442-1-1.jpg',
  },
]

const ProductPage: React.FC = () => {
  const router = useRouter()
  const params = useParams()
  const id = params.id ? Number(params.id) : NaN
  const [tab, setTab] = useState<'description' | 'reviews'>('description')
  const [quantity, setQuantity] = useState<number>(1)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const { data, isLoading } = useGetProductQuery(id)
  const { addToCart } = useCart()

  if (isNaN(id)) return <p>ID sản phẩm không hợp lệ</p>

  const product = data
  const reviews = mockReviews

  if (!product) return <p>Không tìm thấy sản phẩm</p>

  const handleSubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const comment = e.currentTarget.comment.value.trim()

    if (!comment) {
      alert('Vui lòng nhập nội dung đánh giá!')
      return
    }

    if (rating === 0) {
      alert('Vui lòng chọn số sao đánh giá!')
      return
    }

    console.log('Submitting review:', { user_id: 21, product_id: id, comment, rating })
  }

  const calculateAverageRating = (reviews: Review[]): number => {
    if (reviews.length === 0) return 0
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    return parseFloat((totalRating / reviews.length).toFixed(1))
  }

  const averageRating = Math.round(calculateAverageRating(reviews))

  const handleAddToCart = () => {
    if (!product) return
    addToCart(product, quantity)
    toast.success('Thêm vào giỏ hàng thành công')
  }

  return (
    <div className="container mx-auto px-20 py-6">
      {/* Product Details */}
      <div className="mt-24 flex flex-col gap-24 md:flex-row">
        <img src={product.image_url} alt={product.name} className="w-full rounded-lg object-cover md:w-1/2" />
        <div className="flex-1">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <div className="mt-2 flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill={index < averageRating ? 'currentColor' : 'none'}
                className="text-yellow-400"
                viewBox="0 0 16 16"
              >
                <path d="M8 12.146l-3.553 1.867a.75.75 0 0 1-1.08-.792l.677-3.99-2.9-2.83a.75.75 0 0 1 .418-1.278l3.996-.58L7.72.086a.75.75 0 0 1 1.56 0l1.477 4.506 3.996.58a.75.75 0 0 1 .418 1.278l-2.9 2.83.677 3.99a.75.75 0 0 1-1.08.792L8 12.146z" />
              </svg>
            ))}
            <span className="ml-2 text-gray-600">({reviews.length} đánh giá)</span>
          </div>
          <p className="mt-5 text-lg font-medium">{product.unit_price.toLocaleString()}</p>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded border border-gray-300">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2">
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="no-arrows w-12 border-l border-r border-gray-300 text-center outline-none"
              />
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2">
                +
              </button>
            </div>
            <button onClick={handleAddToCart} className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-24">
        <div className="flex border-b border-gray-300">
          <button
            onClick={() => setTab('description')}
            className={`px-4 py-2 ${tab === 'description' ? 'border-b-4 border-black font-bold' : 'text-gray-500'}`}
          >
            Mô tả
          </button>
          <button
            onClick={() => setTab('reviews')}
            className={`px-4 py-2 ${tab === 'reviews' ? 'border-b-4 border-black font-bold' : 'text-gray-500'}`}
          >
            Đánh giá ({reviews.length})
          </button>
        </div>
        {tab === 'description' ? (
          <div className="mt-4 rounded bg-gray-50 p-4 shadow-sm">
            <p>{product.description}</p>
          </div>
        ) : (
          <div className="mt-4 rounded bg-gray-50 p-4 shadow-sm">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 py-4">
                  <p className="font-bold">{review.comment}</p>
                  <div className="mt-2 flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill={index < review.rating ? 'currentColor' : 'none'}
                        className="text-yellow-400"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 12.146l-3.553 1.867a.75.75 0 0 1-1.08-.792l.677-3.99-2.9-2.83a.75.75 0 0 1 .418-1.278l3.996-.58L7.72.086a.75.75 0 0 1 1.56 0l1.477 4.506 3.996.58a.75.75 0 0 1 .418 1.278l-2.9 2.83.677 3.99a.75.75 0 0 1-1.08.792L8 12.146z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>Chưa có đánh giá nào cho sản phẩm này.</p>
            )}
            <form className="mt-6" onSubmit={handleSubmitReview}>
              <input
                name="comment"
                type="text"
                placeholder="Viết đánh giá"
                required
                className="w-full rounded border border-gray-300 p-2"
              />
              <div className="mt-2 flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    className={`cursor-pointer ${index < hoverRating ? 'text-yellow-400' : 'text-gray-300'}`}
                    viewBox="0 0 16 16"
                    onMouseEnter={() => setHoverRating(index + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(index + 1)}
                  >
                    <path d="M8 12.146l-3.553 1.867a.75.75 0 0 1-1.08-.792l.677-3.99-2.9-2.83a.75.75 0 0 1 .418-1.278l3.996-.58L7.72.086a.75.75 0 0 1 1.56 0l1.477 4.506 3.996.58a.75.75 0 0 1 .418 1.278l-2.9 2.83.677 3.99a.75.75 0 0 1-1.08.792L8 12.146z" />
                  </svg>
                ))}
              </div>
              <button type="submit" className="mt-4 rounded bg-black px-4 py-2 text-white">
                Gửi
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Related Products */}
      <div className="mt-24">
        <h2 className="text-2xl font-semibold">Sản phẩm tương tự</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {mockRelatedProducts.map((related) => (
            <div
              onClick={() => router.push(`/product/${related.id}`)}
              key={related.id}
              className="cursor-pointer rounded border p-4"
            >
              <img src={related.image_url} alt={related.name} className="h-48 w-full object-cover" />
              <h3 className="mt-4 text-lg font-bold">{related.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductPage
