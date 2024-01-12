import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { IPaginationHeader } from 'app/types/pagination';
import { useQuery } from 'react-query';

export interface CartItemV2 {
  id: string;
  isActive: string;
  itemId: string;
  itemName: string;
  itemUrl: string;
  itemImage: string;
  price: number;
  quantity: number;
  updatedAt: string;
  vnPrice: string;
  propName: string;
  skuId: string;
}
export interface CartResponseV2 {
  _id: string;
  shopName: string;
  shopUrl: string;
  listItem: CartItemV2[];
}

export const listCartCategories = async (): Promise<{ data: CartResponseV2[]; headers: IPaginationHeader }> => {
  return apiWrapper.get(`/cart/v2`, {});
};

type QueryFnType = typeof listCartCategories;

export const useListCartCategoriesV2 = (config?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useListCartCategoriesV2'],
    queryFn: () => listCartCategories(),
    ...config,
  });
};
