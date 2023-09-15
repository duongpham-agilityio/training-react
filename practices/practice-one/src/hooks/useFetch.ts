import useSWR from 'swr';
import type { SWRConfiguration } from 'swr';

/**
 * This hook is used to call the API
 * @param endpoint The end point of the path
 * @returns
 */
export const useFetch = <T>(
  endpoint: string | null,
  option?: SWRConfiguration
) => {
  const { data, isLoading, error, ...rest } = useSWR<T>(endpoint, option);

  return {
    data,
    isLoading,
    error,
    ...rest,
  };
};
