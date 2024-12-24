"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Product } from "../../../types/Product";
import { Review } from "../../../types/Review";

// Mock dữ liệu
type RelatedProduct = {
  id: number;
  name: string;
  image_url: string;
};

const mockProducts: Record<number, Product> = {
  23: {
    id: 23,
    shop_id: 3,
    category_id: 2,
    name: "Kệ Sách Line",
    unit_price: 27690000,
    description:
      "Kệ sách Line: Tạo điểm nhấn hiện đại cho không gian với kệ sách Line màu trắng tinh tế, thiết kế tối giản, giúp bạn sắp xếp sách và đồ vật gọn gàng.",
    image_url:
      "https://nhaxinh.com/wp-content/uploads/2022/12/KE-SACH-LINE-MAU-BRONZE-1.jpg",
    is_deleted: false,
    quantity: 8,
    createdAt: "2024-11-07 10:28:24",
    updatedAt: "2024-11-07 10:28:24",
  },
};

const mockReviews: Record<number, Review[]> = {
  23: [
    {
      id: 1,
      user_id: 25,
      product_id: 23,
      rating: 4,
      comment: "Kệ sách thiết kế đẹp, nhưng giá hơi cao.",
      approval_status: "approved",
      created_at: "2024-11-07 10:39:49",
      updated_at: "2024-11-07 10:39:49",
    },
    {
      id: 2,
      user_id: 26,
      product_id: 23,
      rating: 5,
      comment: "Rất đẹp và chắc chắn!",
      approval_status: "approved",
      created_at: "2024-11-08 12:15:10",
      updated_at: "2024-11-08 12:15:10",
    },
    {
      id: 3,
      user_id: 27,
      product_id: 23,
      rating: 3,
      comment: "Thiết kế ổn nhưng chưa hoàn hảo.",
      approval_status: "approved",
      created_at: "2024-11-09 14:20:30",
      updated_at: "2024-11-09 14:20:30",
    },
    {
      id: 4,
      user_id: 28,
      product_id: 23,
      rating: 5,
      comment: "Rất thích sản phẩm này!",
      approval_status: "approved",
      created_at: "2024-11-10 10:05:10",
      updated_at: "2024-11-10 10:05:10",
    },
  ],
};

const mockRelatedProducts: RelatedProduct[] = [
  {
    id: 24,
    name: "Kệ Coastal",
    image_url:
      "https://nhaxinh.com/wp-content/uploads/2022/06/KE-SACH-HANGAR-BLACK-H200-3.jpg",
  },
  {
    id: 25,
    name: "Kệ Sách Iris",
    image_url:
      "https://nhaxinh.com/wp-content/uploads/2021/10/ke-sach-iris-1.jpg",
  },
  {
    id: 26,
    name: "Kệ Treo Artigo",
    image_url:
      "https://nhaxinh.com/wp-content/uploads/2021/10/nha-xinh-ke-treo-cico.jpg",
  },
  {
    id: 27,
    name: "Kệ Treo Inside",
    image_url:
      "https://nhaxinh.com/wp-content/uploads/2021/10/ke-treo-3-80442-1-1.jpg",
  },
];

const ProductPage: React.FC = () => {
  const params = useParams();
  const id = params.id ? Number(params.id) : NaN;

  const [tab, setTab] = useState<"description" | "reviews">("description");
  const [quantity, setQuantity] = useState<number>(1);

  if (isNaN(id)) return <p>ID sản phẩm không hợp lệ</p>;

  const product = mockProducts[id];
  const reviews = mockReviews[id] || [];

  if (!product) return <p>Không tìm thấy sản phẩm</p>;

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const [rating, setRating] = useState(0); // To store the selected rating
  const [hoverRating, setHoverRating] = useState(0); // To store the hovered rating

  const handleSubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const comment = e.currentTarget.comment.value;

    if (!comment.trim()) {
      alert("Vui lòng nhập nội dung đánh giá!");
      return;
    }

    if (rating === 0) {
      alert("Vui lòng chọn số sao đánh giá!");
      return;
    }

    const reviewData = {
      user_id: 21, // Replace with dynamic user_id
      product_id: id, // Current product id
      comment,
      rating,
      is_approved: false, // New reviews default to not approved
    };

    console.log("Submitting review:", reviewData);
    // Example API call
    // axios.post("/api/reviews", reviewData);
  };

  const calculateAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  return (
    <div className="container mx-auto px-20 py-6">
      {/* Sản phẩm chính */}
      <div className="mt-24">
        <div className="flex flex-col md:flex-row gap-24">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full md:w-1/2 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill={index < Math.round(calculateAverageRating(reviews)) ? "currentColor" : "none"}
                  className={`text-yellow-400`}
                  viewBox="0 0 16 16"
                >
                  <path d="M8 12.146l-3.553 1.867a.75.75 0 0 1-1.08-.792l.677-3.99-2.9-2.83a.75.75 0 0 1 .418-1.278l3.996-.58L7.72.086a.75.75 0 0 1 1.56 0l1.477 4.506 3.996.58a.75.75 0 0 1 .418 1.278l-2.9 2.83.677 3.99a.75.75 0 0 1-1.08.792L8 12.146z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">
                ({reviews.length} đánh giá)
              </span>
            </div>
            <p
              className="mt-5"
              style={{
                color: "var(--Dark, #111114)",
                fontFamily: '"Libre Bodoni", serif',
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "34px",
                textTransform: "capitalize",
              }}
            >
              {product.unit_price.toLocaleString()}đ
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={handleDecreaseQuantity}
                  className="px-4 py-2 text-lg font-medium"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value)))
                  }
                  className="w-12 text-center border-l border-r border-gray-300 outline-none no-arrows"
                />
                <button
                  onClick={handleIncreaseQuantity}
                  className="px-4 py-2 text-lg font-medium"
                >
                  +
                </button>
              </div>
              <button className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800">
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-24">
        <div className="flex border-b border-gray-300">
          <button
            onClick={() => setTab("description")}
            className={`py-2 px-4 transition-all duration-200 ${
              tab === "description"
                ? "border-b-4 border-black font-bold text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Mô tả
          </button>
          <button
            onClick={() => setTab("reviews")}
            className={`py-2 px-4 transition-all duration-200 ${
              tab === "reviews"
                ? "border-b-4 border-black font-bold text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Đánh giá ({reviews.length})
          </button>
        </div>

        {/* Content rendering based on active tab */}
        {tab === "description" ? (
          <div className="p-4 bg-gray-50 mt-4 rounded shadow-sm">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        ) : (
          <div className="p-4 bg-gray-50 mt-4 rounded shadow-sm">
            {reviews.length > 0 ? (
              reviews.map((review: Review) => (
                <div key={review.id} className="border-b border-gray-200 py-4">
                  <p className="font-bold text-gray-800">{review.comment}</p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill={index < review.rating ? "currentColor" : "none"}
                        className={`text-yellow-400`}
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 12.146l-3.553 1.867a.75.75 0 0 1-1.08-.792l.677-3.99-2.9-2.83a.75.75 0 0 1 .418-1.278l3.996-.58L7.72.086a.75.75 0 0 1 1.56 0l1.477 4.506 3.996.58a.75.75 0 0 1 .418 1.278l-2.9 2.83.677 3.99a.75.75 0 0 1-1.08.792L8 12.146z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Chưa có đánh giá nào cho sản phẩm này.</p>
            )}

            {/* Form viết đánh giá */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800">Viết đánh giá</h3>
              <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmitReview}>
                <input
                  type="text"
                  name="comment"
                  placeholder="Viết đánh giá"
                  className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-black"
                  required
                />
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      className={`cursor-pointer ${
                        index < hoverRating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      viewBox="0 0 16 16"
                      onMouseEnter={() => setHoverRating(index + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(index + 1)}
                    >
                      <path d="M8 12.146l-3.553 1.867a.75.75 0 0 1-1.08-.792l.677-3.99-2.9-2.83a.75.75 0 0 1 .418-1.278l3.996-.58L7.72.086a.75.75 0 0 1 1.56 0l1.477 4.506 3.996.58a.75.75 0 0 1 .418 1.278l-2.9 2.83.677 3.99a.75.75 0 0 1-1.08.792L8 12.146z" />
                    </svg>
                  ))}
                </div>
                <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800" type="submit">
                  Gửi
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Sản phẩm tương tự */}
      <div className="mb-24">
        <h2 className="text-2xl font-semibold mt-24">Sản phẩm tương tự</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {mockRelatedProducts.map((related: RelatedProduct) => (
            <div key={related.id} className="border rounded p-4">
              <img
                src={related.image_url}
                alt={related.name}
                className="w-full h-48 object-cover"
              />
              <h3 className="text-lg font-bold mt-4">{related.name}</h3>
            </div>
          ))
        </div>
      </div>

      <style jsx>{`
        input.no-arrows::-webkit-inner-spin-button,
        input.no-arrows::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input.no-arrows {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default ProductPage;
