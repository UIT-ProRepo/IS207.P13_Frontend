'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'
import ROUTES from '@/constants/routes'

export default function ReturnVNPay() {
  const searchParams = useSearchParams()
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | null>(null)
  const [amount, setAmount] = useState<string>('')

  useEffect(() => {
    const responseCode = searchParams.get('vnp_ResponseCode')
    const vnpAmount = searchParams.get('vnp_Amount')

    if (vnpAmount) {
      const formattedAmount = (parseInt(vnpAmount) / 100).toLocaleString('vi-VN')
      setAmount(formattedAmount)
    }

    if (responseCode === '00') {
      setPaymentStatus('success')
      toast.success('Thanh toán thành công!')
    } else {
      setPaymentStatus('failed')
      toast.error('Thanh toán thất bại!')
    }
  }, [searchParams])

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-[38px]">
      <h2>{paymentStatus === 'success' ? 'Thanh toán thành công!' : 'Thanh toán thất bại!'}</h2>
      {amount && <p className="text-[32px]">Số tiền: {amount} VNĐ</p>}
      <Link href={ROUTES.HOME.BASE}>
        <button className="button-dark text-style-16-semibold">Về trang chủ</button>
      </Link>
    </div>
  )
}
