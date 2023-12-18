import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { IPaginationHeader } from 'app/types/pagination';
import { useQuery } from 'react-query';
import { Language, SortOption } from '../search.const';

export interface ISearchRes {
  num_iid: string;
  category_id: string;
  detail_url: string;
  isTmall: boolean;
  pic_url: string;
  title: string;
  original_price: number;
  price: number;
  original_title: string;
  location: any;
  physical_parameters: any;
  quantity: number;
  status: string;
}

interface ISearchParam {
  q?: string;
  page: number;
  sort: SortOption;
  target_language?: Language;
  query_language?: Language;
  minPrice?: number;
  maxPrice?: number;
}
export const search = async (param: ISearchParam): Promise<{ data: ISearchRes[]; headers: IPaginationHeader }> => {
  return apiWrapper.get(`/taobao`, { ...param });
};

type QueryFnType = typeof search;

export const useSearchItem = (param: ISearchParam, config?: QueryConfig<QueryFnType>) => {
  const { page, q, sort, target_language, query_language, minPrice, maxPrice } = param;
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useSearchItem', page, q, sort, target_language, query_language, minPrice, maxPrice],
    queryFn: () => search(param),
    ...config,
  });
};
export { SortOption };
