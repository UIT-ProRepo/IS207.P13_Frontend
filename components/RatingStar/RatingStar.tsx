'use client'
import React, { useState } from 'react'

const RatingStar = ({ rating: initialRating = 0, size }: { rating: number; size: number }) => {
  const [rating, setRating] = useState(initialRating)

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <span
            key={star}
            style={{
              cursor: 'pointer',
              color: rating >= star ? 'gold' : 'gray',
              fontSize: `${size}px`,
            }}
            onClick={() => {
              setRating(star)
            }}
          >
            {' '}
            ★{' '}
          </span>
        )
      })}
    </div>
  )
}

export default RatingStar
