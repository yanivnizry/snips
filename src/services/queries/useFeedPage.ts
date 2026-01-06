import {useQuery} from '@tanstack/react-query';
import {getFeedPage} from '../apis/Apis';
import type {FeedPageResponse} from '../types/ApiTypes';

export const useFeedPage = () => {
  return useQuery<FeedPageResponse>({
    queryKey: ['feedPage'],
    queryFn: () => getFeedPage(1),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 3,
  });
};

