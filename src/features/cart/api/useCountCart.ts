import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { useQuery } from 'react-query';

export const countCart = async (): Promise<{ data: number }> => {
  return apiWrapper.get(`/cart/count`);
};

type QueryFnType = typeof countCart;

export const useCountCart = (config?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useCountCart'],
    queryFn: () => countCart(),
    ...config,
  });
};
