import { PaymentStatus } from './Transactions.const';

export interface IPaymentTransaction {
  userId: string;
  userName: string;
  referenceId: string;
  orderInfo: string;
  amount: number;
  status: PaymentStatus;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderListingParams {
  page: number;
}

export interface IAdminOrderListingPararms {
  page: number;
  status?: PaymentStatus;
  userId?: string;
  userName?: string;
  timeFrom?: string;
  timeTo?: string;
}
