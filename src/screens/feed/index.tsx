import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigationState } from '@react-navigation/native';
import { useInfiniteFeedPage } from '@/services/queries/useInfiniteFeedPage';
import FeedItem from '@/screens/Feed/components/FeedItem';
import type { FeedScreenProps } from './types';
import { styles } from './styles';
import { COLORS } from '@/services/constants/common';
import type { FeedItem as FeedItemType } from '@/services/types/ApiTypes';
import { DEVICE_HEIGHT, isIPad, BOTTOM_TAB_BAR_HEIGHT } from '@/services/constants/common';
import { useFeedVideoControl } from './hooks/useFeedVideoControl';
import { FEED } from './constants';

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
  const navigationState = useNavigationState(state => state);
  const isFocused = useMemo(() => {
    if (!navigationState) return false;
    const route = navigationState.routes[navigationState.index];
    return route?.name === 'ForYou';
  }, [navigationState]);
  const SCROLL_HEIGHT = DEVICE_HEIGHT - BOTTOM_TAB_BAR_HEIGHT - insets.bottom;

  const feedItems = useMemo(() => {
    return data?.pages.flatMap(page => page.feedTitles) || [];
  }, [data]);

  const {
    getItemRef,
    isScrolling,
    handleViewableItemsChanged,
    handleScrollBeginDrag,
    handleScrollEndDrag,
    handleMomentumScrollEnd,
  } = useFeedVideoControl({
    feedItems,
    isFocused,
  });

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: FEED.VIEWABILITY.ITEM_VISIBLE_PERCENT_THRESHOLD,
    minimumViewTime: FEED.VIEWABILITY.MINIMUM_VIEW_TIME,
  }).current;

  const renderItem = useCallback(
    ({ item, index }: { item: FeedItemType; index: number }) => {
      const itemRef = getItemRef(item.id);
      const isFirstItem = index === FEED.ARRAY.FIRST_ITEM_INDEX;
      const shouldBeMuted = !isFocused && isFirstItem;
      return (
        <FeedItem
          ref={itemRef}
          item={item}
          scrollHeight={SCROLL_HEIGHT}
          isScrolling={isScrolling}
          autoPlay={isFirstItem && !isFocused}
          muted={shouldBeMuted}
        />
      );
    }, [SCROLL_HEIGHT, getItemRef, isScrolling, isFocused],
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
      <FlatList
        data={feedItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={FEED.FLATLIST.END_REACHED_THRESHOLD}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEnabled={!isIPad}
        pagingEnabled={true}
        removeClippedSubviews={true}
        maxToRenderPerBatch={FEED.FLATLIST.MAX_TO_RENDER_PER_BATCH}
        initialNumToRender={FEED.FLATLIST.INITIAL_NUM_TO_RENDER}
        windowSize={FEED.FLATLIST.WINDOW_SIZE}
        scrollEventThrottle={FEED.FLATLIST.SCROLL_EVENT_THROTTLE}
      />
  );
};

export default Feed;