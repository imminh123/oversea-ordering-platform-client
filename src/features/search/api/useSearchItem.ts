import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { IPaginationHeader } from 'app/types/pagination';
import { useQuery } from 'react-query';

export interface ISearchRes {
  num_iid: string;
  pic: string;
  title: string;
  price: string;
  promotion_price: string;
  sales: string;
  user_type: string;
  detail_url: string;
}

export enum SortOption {
  default = 'default',
  salesDesc = 'sales_des',
  salesAsc = 'sales_asc',
  priceAsc = 'price_asc',
  priceDesc = 'price_des',
}

interface ISearchParam {
  q?: string;
  page: number;
  sort: SortOption;
}
export const search = async (param: ISearchParam): Promise<{ data: ISearchRes[]; headers: IPaginationHeader }> => {
  return apiWrapper.get(`/taobao`, { ...param });
};

type QueryFnType = typeof search;

export const useSearchItem = (param: ISearchParam, config?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useSearchItem', param.q, param.page, param.sort],
    queryFn: () => search(param),
    ...config,
  });
};
