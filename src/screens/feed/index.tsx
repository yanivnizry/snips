import React, { useCallback, useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useInfiniteFeedPage } from '@/services/queries/useInfiniteFeedPage';
import FeedItem from '@/screens/Feed/components/FeedItem';
import type { FeedScreenProps } from './types';
import { styles } from './styles';
import { COLORS } from '@/services/constants/common';
import type { FeedItem as FeedItemType } from '@/services/types/ApiTypes';
import { DEVICE_HEIGHT, isIPad, BOTTOM_TAB_BAR_HEIGHT } from '@/services/constants/common';

const Feed: React.FC<FeedScreenProps> = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteFeedPage();
  const insets = useSafeAreaInsets();
  const SCROLL_HEIGHT = DEVICE_HEIGHT - BOTTOM_TAB_BAR_HEIGHT - insets.bottom;

  const feedItems = useMemo(() => {
    return data?.pages.flatMap(page => page.feedTitles) || [];
  }, [data]);

  const renderItem = useCallback(
    ({ item }: { item: FeedItemType }) => <FeedItem item={item} scrollHeight={SCROLL_HEIGHT} />,
    [SCROLL_HEIGHT],
  );

  const keyExtractor = useCallback((item: FeedItemType) => item.id, []);

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: SCROLL_HEIGHT,
      offset: SCROLL_HEIGHT * index,
      index,
    }),
    [SCROLL_HEIGHT],
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) {
      return null;
    }
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={COLORS.WATCH_NOW_BUTTON} />
      </View>
    );
  }, [isFetchingNextPage]);

  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.WATCH_NOW_BUTTON} />
        </View>
      );
    }
    if (isError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error instanceof Error ? error.message : 'Failed to load feed. Please try again later.'}
          </Text>
        </View>
      );
    }
    return null;
  }, [isLoading, isError, error]);

  return (
    <SafeAreaView edges={[]} style={styles.container}>
      <FlatList
        data={feedItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        pagingEnabled={!isIPad}
        decelerationRate={0.88}
        removeClippedSubviews={true}
        maxToRenderPerBatch={1}
        windowSize={2}
        snapToInterval={SCROLL_HEIGHT}
        initialNumToRender={1}
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
      />
    </SafeAreaView>
  );
}

export default Feed;
