export enum PaymentStatus {
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  PENDING = 'pending',
}
export const PaymentsStatusOptions: { value: PaymentStatus | ''; label: string }[] = [
  {
    value: '',
    label: 'Tất cả',
  },
  {
    value: PaymentStatus.SUCCEEDED,
    label: 'Thành công',
  },
  {
    value: PaymentStatus.PENDING,
    label: 'Đang chờ',
  },
  {
    value: PaymentStatus.FAILED,
    label: 'Thất bại',
  },
];
