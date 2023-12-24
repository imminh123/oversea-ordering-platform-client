import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { IPaginationHeader } from 'app/types/pagination';
import { IUserServerResponse, UserRole } from 'app/types/user';
import { useQuery } from 'react-query';

interface IUserListingParams {
  page: number;
  role?: UserRole;
  search?: string;
  isActive?: boolean;
  isBlock?: boolean;
}

export const indexOrder = async (
  param: IUserListingParams,
): Promise<{ data: { items: IUserServerResponse[]; headers: IPaginationHeader } }> => {
  return apiWrapper.get(`/admin/authentication`, { ...param, perPage: 10 });
};

type QueryFnType = typeof indexOrder;

export const useAdminIndexUsers = (param: IUserListingParams, config?: QueryConfig<QueryFnType>) => {
  const { page, role, search, isActive, isBlock } = param;
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useAdminIndexUsers', page, role, search, isActive, isBlock],
    queryFn: () => indexOrder(param),
    ...config,
  });
};
