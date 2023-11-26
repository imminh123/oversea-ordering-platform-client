import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { IPaginationHeader } from 'app/types/pagination';
import { useQuery } from 'react-query';

interface CartItem {
  id: string;
  itemId: string;
  itemName: string;
  itemUrl: string;
  isActive: string;
  price: number;
  quantity: number;
  updatedAt: string;
}
interface CartResponse {
  _id: string;
  shopName: string;
  shopUrl: string;
  listItem: CartItem[];
}

export const listCartCategories = async (
  page: number,
): Promise<{ data: CartResponse[]; headers: IPaginationHeader }> => {
  return apiWrapper.get(`/cart`, { page, perPage: 10 });
};

type QueryFnType = typeof listCartCategories;

export const useListCartCategoriesV2 = (page: number, config?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useListCartCategoriesV2', page],
    queryFn: () => listCartCategories(page),
    ...config,
  });
};
