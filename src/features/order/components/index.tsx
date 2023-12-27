import { Chip } from '@mui/material';
import { OrderStatus } from 'features/cart/api/useGetOrderDetail';

export const mappingOrderStatus = (status?: OrderStatus) => {
  switch (status) {
    case OrderStatus.CREATED:
      return <Chip label='Đã tạo đơn hàng' color='primary' variant='outlined' />;
    case OrderStatus.PENDING_PAYMENT:
      return <Chip label='Đang chờ' color='warning' variant='outlined' />;
    case OrderStatus.DELIVERED:
      return <Chip label='Đã giao hàng' color='success' variant='outlined' />;
    case OrderStatus.SUCCEEDED:
      return <Chip label='Thành công' color='success' variant='outlined' />;
    case OrderStatus.TIMEOUT:
      return <Chip label='Hết hạn' color='error' variant='outlined' />;
    case OrderStatus.FAILED:
      return <Chip label='Thất bại' color='error' variant='outlined' />;
    case OrderStatus.PENDING_ORDER:
      return <Chip label='Đang chờ xử lý' color='warning' variant='outlined' />;
    case OrderStatus.PROCESSING:
      return <Chip label='Đang xử lý' color='warning' variant='outlined' />;
    case OrderStatus.PLACED:
      return <Chip label='Đã đặt hàng' color='primary' variant='outlined' />;
    case OrderStatus.IN_TRANSIT:
      return <Chip label='Đang vận chuyển' color='warning' variant='outlined' />;
    case OrderStatus.OUT_OF_DELIVERY:
      return <Chip label='Đã rời kho' color='primary' variant='outlined' />;
    case OrderStatus.ON_HOLD:
      return <Chip label='Tạm dừng' color='warning' variant='outlined' />;
    case OrderStatus.CANCELLED:
      return <Chip label='Đã hủy' color='error' variant='outlined' />;
    case OrderStatus.REFUNDED:
      return <Chip label='Đã hoàn tiền' color='success' variant='outlined' />;
    case OrderStatus.PARTIALLY_SHIPPED:
      return <Chip label='Giao hàng một phần' color='warning' variant='outlined' />;
    case OrderStatus.BACK_ORDERED:
      return <Chip label='Sản phẩm đặt trước' color='warning' variant='outlined' />;
    default:
      return <Chip label={status} color='error' variant='outlined' />;
  }
};
