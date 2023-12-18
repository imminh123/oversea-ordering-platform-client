import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { useQuery } from 'react-query';

export interface AddressRes {
  id: string;
  address: string;
  province: string;
  city: string;
  ward: string;
  userId: string;
  isDefault: boolean;
  name: string;
  phone: string;
  mail: string;
  note: string;
}

export const listAddress = async (): Promise<{ data: AddressRes[] }> => {
  return apiWrapper.get(`/address`, {});
};

type QueryFnType = typeof listAddress;

export const useListAddress = (config?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useListAddress'],
    queryFn: () => listAddress(),
    ...config,
  });
};
