import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { IPaginationHeader } from 'app/types/pagination';
import { useQuery } from 'react-query';

export interface Variable {
  id: string;
  name: string;
  value: string;
  description: string;
}

export const listVariables = async ({
  page,
  name,
}: {
  page: number;
  name?: string;
}): Promise<{ data: Variable[]; headers: IPaginationHeader }> => {
  return apiWrapper.get(`/variables`, { page, perPage: 10, name });
};

type QueryFnType = typeof listVariables;

export const useListVariables = (
  { page, name }: { page: number; name?: string },
  config?: QueryConfig<QueryFnType>,
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useListVariables', page, name],
    queryFn: () => listVariables({ page, name }),
    ...config,
  });
};
