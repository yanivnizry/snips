import { useInfiniteQuery, type UseInfiniteQueryOptions } from '@tanstack/react-query';
import { getFeedPage } from '../apis/Apis';
import type { FeedPageResponse } from '../types/ApiTypes';
import {
  QUERY_TIME,
  QUERY_BEHAVIOR,
} from './queryOptions';

interface InfiniteFeedPageData {
  readonly pages: readonly FeedPageResponse[];
  readonly pageParams: readonly (number | undefined)[];
}

const FEED_PAGE_QUERY_KEY = ['feedPage', 'infinite'] as const;

export const feedPageInfiniteQueryOptions: UseInfiniteQueryOptions<
  FeedPageResponse,
  Error,
  InfiniteFeedPageData,
  readonly ['feedPage', 'infinite'],
  number
> = {
  queryKey: FEED_PAGE_QUERY_KEY,
  queryFn: ({ pageParam }: { pageParam: number }) => getFeedPage(pageParam),
  getNextPageParam: (lastPage: FeedPageResponse) => {
    if (lastPage.nextPage > lastPage.currentPage) {
      return lastPage.nextPage;
    }
    return undefined;
  },
  getPreviousPageParam: (firstPage: FeedPageResponse) => {
    if (firstPage.currentPage > 1) {
      return firstPage.currentPage - 1;
    }
    return undefined;
  },
  initialPageParam: 1,
  staleTime: QUERY_TIME.STALE_TIME.DEFAULT,
  gcTime: QUERY_TIME.GC_TIME.LONG,
  refetchOnWindowFocus: QUERY_BEHAVIOR.REFETCH_ON_WINDOW_FOCUS,
  refetchOnMount: QUERY_BEHAVIOR.REFETCH_ON_MOUNT.INFINITE_FEED,
  retry: QUERY_BEHAVIOR.RETRY.INFINITE_FEED,
};

export const useInfiniteFeedPage = () => {
  return useInfiniteQuery(feedPageInfiniteQueryOptions);
};

export { FEED_PAGE_QUERY_KEY };

