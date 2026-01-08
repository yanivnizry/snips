import {useQuery} from '@tanstack/react-query';
import {getHomePage} from '../apis/Apis';
import type {HomePageResponse} from '../types/ApiTypes';
import {
  QUERY_TIME,
  QUERY_BEHAVIOR,
} from './queryOptions';

/**
 * React Query hook for fetching home page data
 * @returns Query result with home page data, loading state, and error state
 */
export const useHomePage = () => {
  return useQuery<HomePageResponse>({
    queryKey: ['homePage'],
    queryFn: getHomePage,
    staleTime: QUERY_TIME.STALE_TIME.HOME_PAGE,
    gcTime: QUERY_TIME.GC_TIME.LONG,
    refetchOnWindowFocus: QUERY_BEHAVIOR.REFETCH_ON_WINDOW_FOCUS,
    refetchOnMount: QUERY_BEHAVIOR.REFETCH_ON_MOUNT.DEFAULT,
    retry: QUERY_BEHAVIOR.RETRY.DEFAULT,
  });
};

