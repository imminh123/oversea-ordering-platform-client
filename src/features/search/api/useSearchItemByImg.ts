import { apiWrapper } from 'app/api/axiosClient';
import { MutationConfig } from 'app/api/react-query';
import useAlert from 'app/hooks/useAlert';
import { useMutation } from 'react-query';
import { Language, SortOption } from '../search.const';
import { ISearchRes } from './useSearchItem';
import { IPaginationHeader } from 'app/types/pagination';

interface ISearchParam {
  page: number;
  sort: SortOption;
  target_language?: Language;
  query_language?: Language;
  minPrice?: number;
  maxPrice?: number;
}

export const searchItemByImage = async ({
  param,
  body,
}: {
  param: ISearchParam;
  body: any;
}): Promise<{ items: ISearchRes[]; headers: IPaginationHeader }> => {
  const res = (await apiWrapper.post(`/taobao/image`, body, param, {
    'Content-Type': 'multipart/form-data',
  })) as any;
  return res.data;
};

type QueryFnType = typeof searchItemByImage;

export const useSearchItemByImg = (config?: MutationConfig<QueryFnType>) => {
  const { alertError } = useAlert();
  return useMutation({
    mutationFn: searchItemByImage,
    onError(error) {
      alertError(error.response?.data.message);
    },
    ...config,
  });
};
