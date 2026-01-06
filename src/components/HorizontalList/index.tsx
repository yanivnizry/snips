import React, {forwardRef, useCallback} from 'react';
import {FlatList, NativeScrollEvent, NativeSyntheticEvent, LayoutChangeEvent} from 'react-native';
import {styles} from './styles';
import type {HorizontalListProps} from './types';
import { Title } from '@/services/types/ApiTypes';

const HorizontalList = forwardRef<FlatList, HorizontalListProps>(
  (
    {
      data,
      renderItem,
      keyExtractor,
      onScrollToEnd,
      scrollEnabled = true,
      onScroll,
      onContentSizeChange,
      onLayout,
    }: HorizontalListProps,
    ref,
  ) => {
    const handleEndReached = useCallback(() => {
      if (onScrollToEnd) {
        onScrollToEnd();
      }
    }, [onScrollToEnd]);

    const handleScroll = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (onScroll) {
          onScroll(event);
        }
      },
      [onScroll],
    );

    const handleContentSizeChange = useCallback(
      (width: number, height: number) => {
        if (onContentSizeChange) {
          onContentSizeChange(width, height);
        }
      },
      [onContentSizeChange],
    );

    const memoizedRenderItem = useCallback(
      ({item, index}: {item: Title; index: number}) => renderItem(item, index),
      [renderItem],
    );

    return (
      <FlatList
        ref={ref}
        data={data}
        renderItem={memoizedRenderItem}
        keyExtractor={keyExtractor}
        horizontal={true}
        scrollEnabled={scrollEnabled}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        onScroll={handleScroll}
        onContentSizeChange={handleContentSizeChange}
        onLayout={onLayout}
        scrollEventThrottle={16}
        contentContainerStyle={styles.horizontalList}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
        updateCellsBatchingPeriod={50}
      />
    );
  },
);

HorizontalList.displayName = 'HorizontalList';

export default HorizontalList;

