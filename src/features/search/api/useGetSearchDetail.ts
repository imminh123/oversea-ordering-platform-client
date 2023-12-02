import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { useQuery } from 'react-query';

interface PriceInfo {
  price: string;
  origin_price: string;
}

interface ShopInfo {
  shop_id: string;
  seller_id: string;
  shop_name: string;
  shop_url: string;
  shop_logo: string;
  shop_rate: { title: string; type: string; score: string }[];
  is_tmall: boolean;
  wangwang: string;
}

export interface SkuProps {
  pid: string;
  prop_name: string;
  values: { vid: string; name: string; imageUrl: string }[];
}

interface Skus {
  skuid: string;
  sale_price: string;
  origin_price: string;
  stock: number;
  props_ids: string;
  props_names: string;
  sub_price: any;
  sub_price_type: string;
}

export interface ISearchDetail {
  item_id: string;
  product_url: string;
  title: string;
  main_imgs: string[];
  video_url: string;
  currency: string;
  price_info: PriceInfo;
  comment_count: any;
  category_id: number;
  product_props: any;
  delivery_info: any;
  shop_info: ShopInfo;
  sku_props: SkuProps[];
  skus: Skus[];
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
