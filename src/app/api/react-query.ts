import storage from 'app/utils/storage'
import { AxiosError } from 'axios'
import { DefaultOptions, QueryClient, UseMutationOptions, UseQueryOptions } from 'react-query'

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: (error: any) => error?.response?.data?.statusCode === 500,
    refetchOnWindowFocus: false,
    retry: false,
    onError: (err: any) => {
      if (err?.response?.status === 401) {
        storage.clearToken()
        window.location.reload()
      }
    },
  },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<ReturnType<FnType>>

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>

export type MutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  AxiosError,
  Parameters<MutationFnType>[0]
>
