import {useQuery} from '@tanstack/react-query';
import {getFeedPage} from '../apis/Apis';
import type {FeedPageResponse} from '../types/ApiTypes';
import {DEFAULT_QUERY_OPTIONS} from './queryOptions';

export const useFeedPage = () => {
  return useQuery<FeedPageResponse>({
    queryKey: ['feedPage'],
    queryFn: () => getFeedPage(1),
    ...DEFAULT_QUERY_OPTIONS,
  });
};

