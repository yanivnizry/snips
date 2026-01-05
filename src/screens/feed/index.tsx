import React, {useCallback, useMemo} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFeedPage} from '@/services/queries/useFeedPage';
import FeedItem from '@/screens/Feed/components/FeedItem';
import type {FeedScreenProps} from './types';
import {styles} from './styles';
import {COLORS, DIMENSIONS} from '@/services/constants/Constants';
import type {FeedItem as FeedItemType, FeedPageResponse} from '@/services/types/ApiTypes';

const Feed: React.FC<FeedScreenProps> = () => {
  const {data, isLoading, isFetching, error} = useFeedPage();

  const feedItems = useMemo(() => {
    return (data as FeedPageResponse | undefined)?.feedTitles || [];
  }, [data]);

  const itemHeight = DIMENSIONS.FEED_ITEM.HEIGHT;

  const renderItem = useCallback(
    ({item}: {item: FeedItemType}) => <FeedItem item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: FeedItemType) => item.id, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    }),
    [itemHeight],
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
        pagingEnabled={true}
        snapToInterval={itemHeight}
        snapToAlignment="start"
        decelerationRate="fast"
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
