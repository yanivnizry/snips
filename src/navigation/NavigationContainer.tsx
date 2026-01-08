import React, { useCallback } from 'react';
import {NavigationContainer as RNNavigationContainer, DarkTheme} from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import TabNavigator from './TabNavigator';
import { getFeedPage } from '@/services/apis/Apis';
import type { FeedPageResponse } from '@/services/types/ApiTypes';

const NavigationContainer: React.FC = () => {
  const queryClient = useQueryClient();

  const onReady = useCallback(() => {
    console.log('Navigation ready, prefetching feed...');
    queryClient.prefetchInfiniteQuery({
      queryKey: ['feedPage', 'infinite'],
      queryFn: ({ pageParam }) => {
        console.log('Prefetching feed page:', pageParam);
        return getFeedPage(pageParam);
      },
      getNextPageParam: (lastPage: FeedPageResponse) => {
        if (lastPage.nextPage > lastPage.currentPage) {
          return lastPage.nextPage;
        }
        return undefined;
      },
      initialPageParam: 1,
      staleTime: 2 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    })
      .then(() => {
        console.log('Feed prefetched successfully');
      })
      .catch((error) => {
        console.warn('Failed to prefetch feed:', error);
      });
  }, [queryClient]);

  return (
    <RNNavigationContainer onReady={onReady}>
      <TabNavigator />
    </RNNavigationContainer>
  );
};

export default NavigationContainer;

