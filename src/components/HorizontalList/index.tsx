import React, {forwardRef, useCallback, useMemo} from 'react';
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
      itemWidth,
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

    const getItemLayout = useMemo(() => {
      if (!itemWidth) {
        return undefined;
      }
      return (_: unknown, index: number) => ({
        length: itemWidth,
        offset: itemWidth * index,
        index,
      });
    }, [itemWidth]);

    return (
      <FlatList
        ref={ref}
        data={data}
        renderItem={memoizedRenderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
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
        maxToRenderPerBatch={4}
        windowSize={8}
        initialNumToRender={4}
        updateCellsBatchingPeriod={50}
      />
    );
  },
);

HorizontalList.displayName = 'HorizontalList';

export default HorizontalList;

