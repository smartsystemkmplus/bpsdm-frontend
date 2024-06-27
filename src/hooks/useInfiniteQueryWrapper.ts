import {
  InfiniteData,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRef } from 'react';

import useOnScrollFetch from './useOnScrollFetch';

export default function useInfiniteQueryWrapper<
  T,
  TSelect = InfiniteData<T>,
>(
  reactQueryObj: UseInfiniteQueryResult<TSelect, AxiosError>,
  orientation: 'vertical' | 'horizontal' = 'vertical',
  disabled: boolean = false
) {
  const ref = useRef<HTMLDivElement>(null);
  const { hasNextPage, fetchNextPage, ...rest } = reactQueryObj;

  useOnScrollFetch(
    hasNextPage,
    fetchNextPage,
    ref,
    orientation,
    disabled
  );

  return { ref, ...rest };
}
