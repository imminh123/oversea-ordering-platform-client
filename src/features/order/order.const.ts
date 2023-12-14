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
    label: 'Đang chờ thanh toán',
  },
  {
    value: OrderStatus.SUCCEEDED,
    label: 'Thành công',
  },
  {
    value: OrderStatus.TIMEOUT,
    label: 'Hết hạn',
  },
  {
    value: OrderStatus.PENDING_ORDER,
    label: 'Đang chờ đặt hàng',
  },
  {
    value: OrderStatus.PROCESSING,
    label: 'Đang xử lý',
  },
  {
    value: OrderStatus.PLACED,
    label: 'Đã đặt',
  },
  {
    value: OrderStatus.IN_TRANSIT,
    label: 'Đang vận chuyển',
  },
  {
    value: OrderStatus.OUT_OF_DELIVERY,
    label: 'Đã rời kho',
  },
  {
    value: OrderStatus.ON_HOLD,
    label: 'Tạm giữ',
  },
  {
    value: OrderStatus.CANCELLED,
    label: 'Bị hủy',
  },
  {
    value: OrderStatus.REFUNDED,
    label: 'Hoàn đơn',
  },
  {
    value: OrderStatus.PARTIALLY_SHIPPED,
    label: 'Giao một phần',
  },
  {
    value: OrderStatus.BACK_ORDERED,
    label: 'Đặt lại đơn',
  },
];
