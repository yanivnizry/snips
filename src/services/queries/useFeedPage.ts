import {useQuery} from '@tanstack/react-query';
import {getFeedPage} from '../apis/Apis';
import type {FeedPageResponse} from '../types/ApiTypes';

export const useFeedPage = () => {
  return useQuery<FeedPageResponse>({
    queryKey: ['feedPage'],
    queryFn: getFeedPage,
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

