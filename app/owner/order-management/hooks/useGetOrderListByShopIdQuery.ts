import { api } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const useGetOrderListByShopIdQuery = (shopId: number) =>
  useQuery({
    queryKey: ['order-list', shopId],
    queryFn: async () => {
      try {
        const response = await api.get('/orders')

        const FormattedOrderList: any[] = []

        response.data.forEach((order: any) => {
          order.order_details.forEach((orderDetail: any) => {
            if (orderDetail.product.shop_id === shopId) {
              FormattedOrderList.push({
                id: order.id,
                order_date: order.order_date,
                delivery_status: order.delivery_status,
                order_detail: {
                  quantity: orderDetail.id,
                },
                product: {
                  id: orderDetail.product.id,
                  name: orderDetail.product.name,
                  unit_price: orderDetail.product.unit_price,
                },
              })
            }
          })
        })

        return FormattedOrderList
      } catch (error) {
        console.error(error)
        toast.error('Lỗi khi lấy danh sách đơn hàng')
      }
    },
  })

export default useGetOrderListByShopIdQuery
