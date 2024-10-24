'use client'
import React from 'react'
import useUserStore from '../stores/useUserStore'
import { useShallow } from 'zustand/shallow'
import CreateButton from './CreateButton'

const FunctionBar = () => {
  const [activeSlide, rowPerSlide, originalUserList, decreaseActiveSlide, increaseActiveSlide] = useUserStore(
    useShallow((state) => [
      state.activeSlide,
      state.rowPerSlide,
      state.originalUserList,
      state.decreaseActiveSlide,
      state.increaseActiveSlide,
    ]),
  )

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div>
          <button
            disabled={originalUserList.length === 0 || activeSlide === 0}
            onClick={decreaseActiveSlide}
            className="button-dark !px-4 !py-2"
          >
            {'<'}
          </button>
          <button
            disabled={
              originalUserList.length === 0 || activeSlide === Math.ceil(originalUserList.length / rowPerSlide) - 1
            }
            onClick={increaseActiveSlide}
            className="button-dark !px-4 !py-2"
          >
            {'>'}
          </button>
        </div>
        <div>
          {originalUserList.length === 0 ? (
            <> 0 - 0 / 0</>
          ) : (
            <>
              {activeSlide * rowPerSlide + 1} - {(activeSlide + 1) * 10} / {originalUserList.length}
            </>
          )}
        </div>
      </div>

      <CreateButton />
    </div>
  )
}

export default FunctionBar
