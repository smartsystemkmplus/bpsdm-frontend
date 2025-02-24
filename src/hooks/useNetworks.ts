/* eslint-disable react-hooks/rules-of-hooks */
import apiService from '@services/api';
import { BASE_PROXY } from '@services/api/endpoint';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import baseURL from '@utils/baseURL';
import showErrorDialog from '@utils/showErrorDialog';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
export interface StrapiMeta {
  pagination?: StrapiPagination;
}
export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface StrapiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, unknown>;
  };
}
export interface GenericQueryResponse<T> {
  data: T;
  status?: string;
  success?: boolean;
  message?: string;
  code?: number;
  meta?: StrapiMeta;
}

interface GenericAPIErrorData extends StrapiError {
  message?: string;
}

export interface GenericAPIError {
  response?: AxiosResponse<GenericAPIErrorData>;
}

interface CustomUseQueryOptions<T, TSelect = T>
  extends UseQueryOptions<T, AxiosError, TSelect> {
  onSuccess?: (data: T | TSelect) => void;
  onError?: (error: AxiosError) => void;
}

interface CustomUseInfiniteQueryOptions<T, TSelect = InfiniteData<T>>
  extends UseInfiniteQueryOptions<T, AxiosError, TSelect> {
  onSuccess?: (data: T | TSelect) => void;
  onError?: (error: AxiosError) => void;
  select?: (data: InfiniteData<T>) => TSelect;
}

interface MutationFnParams {
  endpoint: string;
  data?: unknown;
  axiosConfigs?: AxiosRequestConfig;
}

/**
 * Responsible for handling network requests.
 *
 * - Responsible for passing the service URL to the network request.
 */

export default function useNetworks(service: string) {
  const serviceBaseURL = baseURL(service);

  /**
   * Responsible for handling fetching data from the API.
   *
   * @param endpoint - The endpoint to fetch data from.
   * @param options - The options for the query.
   * @param axiosConfigs - The Axios configurations for the query.
   * @param method - The method to use for the query.
   */

  const query = <T, TSelect = T>(
    endpoint: string,
    options: CustomUseQueryOptions<T, TSelect>,
    axiosConfigs: AxiosRequestConfig = {},
    method: string = 'get'
  ) =>
    useQuery<T, AxiosError, TSelect>({
      queryFn: async () =>
        apiService
          .request<AxiosResponse>(
            serviceBaseURL,
            method,
            endpoint,
            undefined,
            axiosConfigs
          )
          .then((result) => {
            options?.onSuccess?.(result as T);
            return result;
          })
          .catch((err) => {
            if (typeof options?.onError === 'function') {
              options.onError(err);
            } else {
              showErrorDialog(err);
            }
            return err;
          }),

      ...options,
    });

  /**
   * Responsible for handling fetching data from the API infinitely.
   *
   * @param endpoint - The endpoint to fetch data from.
   * @param options - The options for the query.
   * @param axiosConfigs - The Axios configurations for the query.
   *
   */

  const infiniteQuery = <T, TSelect = InfiniteData<T>>(
    endpoint: string,
    options: CustomUseInfiniteQueryOptions<T, TSelect>,
    axiosConfigs: AxiosRequestConfig = {}
  ) =>
    useInfiniteQuery<T, AxiosError, TSelect>({
      queryFn: async ({ pageParam = 1 }) => {
        const paginationParam =
          service === BASE_PROXY.strapi ||
          service === BASE_PROXY.searchEngine
            ? { 'pagination[page]': pageParam }
            : { page: pageParam };

        return apiService
          .request<AxiosResponse>(
            serviceBaseURL,
            'get',
            endpoint,
            undefined,
            {
              ...axiosConfigs,
              params: { ...axiosConfigs.params, ...paginationParam },
            }
          )
          .then((result) => {
            options?.onSuccess?.(result as T);
            return result;
          })
          .catch((err) => {
            if (typeof options?.onError === 'function') {
              options.onError(err);
            } else {
              showErrorDialog(err);
            }
            return err;
          });
      },
      ...options,
    });

  /**
   * Responsible for handling mutations.
   *
   * @param method - The method to use for the mutation.
   * @param options - The options for the mutation.
   */

  const mutation = <T>(
    method: string,
    options: UseMutationOptions<
      T,
      GenericAPIError,
      MutationFnParams
    > = {},
    outerAxiosConfigs: AxiosRequestConfig = {}
  ) =>
    useMutation<T, GenericAPIError, MutationFnParams>({
      mutationFn: async ({ endpoint, data, axiosConfigs = {} }) =>
        apiService.request<T>(
          serviceBaseURL,
          method,
          endpoint,
          data,
          {
            ...outerAxiosConfigs,
            ...axiosConfigs,
          }
        ),
      onError: (err) => showErrorDialog(err),
      ...options,
    });

  return { query, infiniteQuery, mutation };
}
