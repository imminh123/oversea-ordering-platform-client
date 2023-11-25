import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { IPaginationHeader } from 'app/types/pagination';
import { useQuery } from 'react-query';

interface Item {
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
  propName: string;
  userId: string;
  updatedAt: string;
  vnPrice: string;
}

export const listCartCategories = async (page: number): Promise<{ data: Item[]; headers: IPaginationHeader }> => {
  return apiWrapper.get(`/cart`, { page, perPage: 10 });
};

type QueryFnType = typeof listCartCategories;

export const useListCartCategories = (page: number, config?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useListCartCategories', page],
    queryFn: () => listCartCategories(page),
    ...config,
  });
};
