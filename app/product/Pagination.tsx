'use client'
import React from 'react'
import useInventoryStore from './stores/useProductListStore'
import { useShallow } from 'zustand/shallow'

const Pagination = () => {
  const [activeSlide, rowPerSlide, numberOfResult, decreaseActiveSlide, increaseActiveSlide] = useInventoryStore(
    useShallow((state) => [
      state.activeSlide,
      state.rowPerSlide,
      state.numberOfResult,
      state.decreaseActiveSlide,
      state.increaseActiveSlide,
    ]),
  )

  return (
    <div className="flex items-center gap-4">
      <div>
        <button
          disabled={numberOfResult === 0 || activeSlide === 0}
          onClick={decreaseActiveSlide}
          className="button-dark !px-4 !py-2"
        >
          {'<'}
        </button>
        <button
          disabled={numberOfResult === 0 || activeSlide === Math.ceil(numberOfResult / rowPerSlide) - 1}
          onClick={increaseActiveSlide}
          className="button-dark !px-4 !py-2"
        >
          {'>'}
        </button>
      </div>

      <div>
        {numberOfResult === 0 ? (
          <>0 - 0 / 0</>
        ) : (
          <>
            {activeSlide * rowPerSlide + 1} - {Math.min((activeSlide + 1) * rowPerSlide, numberOfResult)} /{' '}
            {numberOfResult}
          </>
        )}
      </div>
    </div>
  )
}

export default Pagination
