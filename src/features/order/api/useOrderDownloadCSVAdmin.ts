import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { OrderStatus } from 'features/cart/api/useGetOrderDetail';
import { useQuery } from 'react-query';

interface IOrderDownloadParams {
  page: number;
  status?: OrderStatus;
  userName?: string;
  itemName?: string;
  timeFrom?: string;
  timeTo?: string;
  taobaoDeliveryId?: string;
}

export const downloadOrderAdmin = async (param: IOrderDownloadParams) => {
  const response: any = await apiWrapper.get(
    `/order/admin/download`,
    { ...param, perPage: 10 },
    { responseType: 'blob' },
  );
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `MBY_Orders` + new Date().toISOString() + `.csv`);
  document.body.appendChild(link);
  link.click();
};

type QueryFnType = typeof downloadOrderAdmin;

export const useDownloadOrdersAdmin = (param: IOrderDownloadParams, config?: QueryConfig<QueryFnType>) => {
  const { page, status, timeFrom, timeTo, itemName, userName, taobaoDeliveryId } = param;
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useDownloadOrdersAdmin', page, status, timeFrom, timeTo, itemName, userName, taobaoDeliveryId],
    queryFn: () => downloadOrderAdmin(param),
    ...config,
  });
};
