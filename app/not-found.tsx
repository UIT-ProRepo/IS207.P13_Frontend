import Link from 'next/link'
import ROUTES from '@/constants/routes'

export default function NotFound() {
  return (
    <div className="mt-52 flex flex-col items-center justify-center gap-4">
      <h1>404</h1>
      <p>Không tìm thấy trang này</p>
      <Link href={ROUTES.HOME.BASE}>
        <button className="button-dark text-style-16-semibold">Về trang chủ</button>
      </Link>
    </div>
  )
}
