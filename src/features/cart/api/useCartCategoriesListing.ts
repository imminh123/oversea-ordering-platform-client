import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { useQuery } from 'react-query';

export interface CartResponse {
  id: string;
  itemId: string;
  itemName: string;
  itemUrl: string;
  shopId: string;
  shopName: string;
  shopUrl: string;
  quantity: number;
  price: string;
  image: string[];
  currency: string;
  propId: string;
  propName: string;
  isActive: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  vnPrice: string;
}

export const listCartCategories = async (cartIds: string[]): Promise<{ data: CartResponse[] }> => {
  return apiWrapper.get(`/cart`, { cartIds });
};

type QueryFnType = typeof listCartCategories;

export const useListCartCategories = (cartIds: string[], config?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useListCartCategories', cartIds],
    queryFn: () => listCartCategories(cartIds),
    ...config,
  });
};
