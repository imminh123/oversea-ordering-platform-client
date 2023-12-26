import { Chip } from '@mui/material';
import { PaymentStatus } from '../Transactions.const';

export const mappingPaymentStatus = (status?: PaymentStatus) => {
  switch (status) {
    case PaymentStatus.SUCCEEDED:
      return <Chip label='Thành công' color='success' variant='outlined' />;
    case PaymentStatus.PENDING:
      return <Chip label='Đang chờ' color='warning' variant='outlined' />;
    case PaymentStatus.FAILED:
      return <Chip label='Lỗi' color='error' variant='outlined' />;
    default:
      return <Chip label={status} color='error' variant='outlined' />;
  }
};
