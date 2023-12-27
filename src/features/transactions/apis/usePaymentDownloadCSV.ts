import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { useQuery } from 'react-query';
import { IAdminOrderListingPararms } from '../Transaction.interface';

export const downloadPaymentsAdmin = async (param: IAdminOrderListingPararms) => {
  const response: any = await apiWrapper.get(
    `/payment/admin/download`,
    { ...param, perPage: 10 },
    { responseType: 'blob' },
  );
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `MBY_Payment_Transactions` + new Date().toISOString() + `.csv`);
  document.body.appendChild(link);
  link.click();
};

type QueryFnType = typeof downloadPaymentsAdmin;

export const useDownloadPaymentTransactionsAdmin = (
  param: IAdminOrderListingPararms,
  config?: QueryConfig<QueryFnType>,
) => {
  const { page, status, userId, userName, timeFrom, timeTo } = param;
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useDownloadPaymentTransactionsAdmin', page, status, userId, userName, timeFrom, timeTo],
    queryFn: () => downloadPaymentsAdmin(param),
    ...config,
  });
};
