import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { IPaginationHeader } from 'app/types/pagination';
import { useQuery } from 'react-query';

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

export enum SortOption {
  default = 'default',
  totalPriceAsc = 'total_price_asc',
  totalPriceDesc = 'total_price_desc',
  priceAsc = 'price_asc',
  priceDesc = 'price_des',
  volumeDesc = 'volume_desc',
  vendorRatingDesc = 'vendor_rating_desc',
  updatedTimeDesc = 'updated_time_desc',
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
