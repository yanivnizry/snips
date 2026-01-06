import React, { useCallback, useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFeedPage } from '@/services/queries/useFeedPage';
import FeedItem from '@/screens/Feed/components/FeedItem';
import type { FeedScreenProps } from './types';
import { styles } from './styles';
import { COLORS } from '@/services/constants/common';
import type { FeedItem as FeedItemType, FeedPageResponse } from '@/services/types/ApiTypes';
import { DEVICE_WIDTH, DEVICE_HEIGHT, isIPad, BOTTOM_TAB_BAR_HEIGHT } from '@/services/constants/common';

const Feed: React.FC<FeedScreenProps> = () => {
  const { data, isLoading, error } = useFeedPage();
  const insets = useSafeAreaInsets();
  const SCROLL_HEIGHT = DEVICE_HEIGHT - BOTTOM_TAB_BAR_HEIGHT - insets.bottom;

  const feedItems = useMemo(() => {
    return (data as FeedPageResponse | undefined)?.feedTitles || [];
  }, [data]);

  const renderItem = useCallback(
    ({ item }: { item: FeedItemType }) => <FeedItem item={item} />,
    [],
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

  if (isLoading) {
    return (
      <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.WATCH_NOW_BUTTON} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load feed. Please try again later.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={[]} style={styles.container}>
      <FlatList
        data={feedItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        pagingEnabled={!isIPad}
        snapToInterval={SCROLL_HEIGHT}
        snapToAlignment="start"
        decelerationRate={0.92}
        disableIntervalMomentum={false}
        scrollEventThrottle={16}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={5}
        initialNumToRender={3}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Feed;
