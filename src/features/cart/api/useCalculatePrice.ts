import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { useQuery } from 'react-query';

export interface CalculatedPriceRes {
  data: {
    totalInCNY: string;
    totalInVND: string;
  };
}

export const calculatePrice = async (ids: string): Promise<CalculatedPriceRes> => {
  return apiWrapper.get(`/cart/calculateSummaryCart`, { ids: ids });
};

type QueryFnType = typeof calculatePrice;

export const useCalculatePrice = (ids: string, config?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useCalculatePrice', ids],
    queryFn: () => calculatePrice(ids),
    ...config,
  });
};
