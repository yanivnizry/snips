import React, { useCallback } from 'react';
import {NavigationContainer as RNNavigationContainer} from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import TabNavigator from './TabNavigator';
import { feedPageInfiniteQueryOptions } from '@/services/queries/useInfiniteFeedPage';

const NavigationContainer: React.FC = () => {
  const queryClient = useQueryClient();

  const onReady = useCallback(() => {
    console.log('Navigation ready, prefetching feed...');
    queryClient.prefetchInfiniteQuery(feedPageInfiniteQueryOptions)
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

