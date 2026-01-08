import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeedPage } from '../apis/Apis';
import type { FeedPageResponse } from '../types/ApiTypes';

interface InfiniteFeedPageData {
  readonly pages: readonly FeedPageResponse[];
  readonly pageParams: readonly (number | undefined)[];
}

export const useInfiniteFeedPage = () => {
  return useInfiniteQuery<FeedPageResponse, Error, InfiniteFeedPageData, readonly ['feedPage', 'infinite'], number>({
    queryKey: ['feedPage', 'infinite'],
    queryFn: ({ pageParam }) => getFeedPage(pageParam),
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
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });
};

