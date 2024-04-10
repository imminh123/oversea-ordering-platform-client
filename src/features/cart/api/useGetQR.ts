import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { useQuery } from 'react-query';
import { AddressRes } from './useGetAddressListing';

interface IQRData {
  qrCode: string;
  qrDataURL: string;
}

interface IQRResponse {
  code: string;
  desc: string;
  data: IQRData;
}

export const getQR = async ({ amount, addInfo }: { addInfo: string; amount: number }): Promise<IQRResponse> => {
  const res = await apiWrapper.get<{ data: IQRResponse }>(`/payment/getQr`, {
    amount,
    addInfo,
  });
  return res.data;
};

type QueryFnType = typeof getQR;

export const useGetQR = (
  { amount, addInfo }: { addInfo: string; amount: number },
  config?: QueryConfig<QueryFnType>,
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useGetQR'],
    queryFn: () => getQR({ amount, addInfo }),
    enabled: !!amount,
    ...config,
  });
};
