import { OrderStatus } from 'features/cart/api/useGetOrderDetail';

export const OrderStatusOptions: { value: OrderStatus; label: string }[] = [
  {
    value: OrderStatus.CREATED,
    label: 'Đã tạo',
  },
  {
    value: OrderStatus.DELIVERED,
    label: 'Đã vận chuyển',
  },
  {
    value: OrderStatus.FAILED,
    label: 'Thất bại',
  },
  {
    value: OrderStatus.PENDING_PAYMENT,
    label: 'Đang chờ',
  },
  {
    value: OrderStatus.SUCCEEDED,
    label: 'Thành công',
  },
  {
    value: OrderStatus.TIMEOUT,
    label: 'Hết hạn',
  },
];
