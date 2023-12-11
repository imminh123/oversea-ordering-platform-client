import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { useQuery } from 'react-query';

interface PriceRangeInfos {
  Price: number;
  ConvertPrice: number;
}
interface OriginalPriceRangeInfos {
  Price: number;
  ConvertPrice: number;
}

export interface SkuProps {
  IsImg: boolean;
  Prop: string;
  Value: { value: string; name: string; imageUrl: string }[];
}

export interface ISearchDetail {
  CategoryId: number;
  OfferId: number;
  Subject: string;
  ImageUrls: string[];
  MainImageVideo: string;
  PriceRangeInfos: PriceRangeInfos[];
  OriginalPriceRangeInfos: OriginalPriceRangeInfos[];
  ProductFeatures: any;
  Delivery: any;
  ShopId: string;
  SkuProps: SkuProps[];
  SkuMaps: any[];
  AmountOnSale: number;
  Detail: string;
  ShopName: string;
  ShopUrl: string;
}

export const getSearchDetail = async (id: string): Promise<{ data: ISearchDetail }> => {
  return apiWrapper.get(`/taobao/v1/${id}`, {});
};

type QueryFnType = typeof getSearchDetail;

export const useGetSearchItemDetail = (id: string, config?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useGetSearchItemDetail', id],
    queryFn: () => getSearchDetail(id),
    ...config,
  });
};
