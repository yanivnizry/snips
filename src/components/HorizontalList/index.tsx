import React, { forwardRef } from 'react';
import {FlatList, NativeScrollEvent, NativeSyntheticEvent, LayoutChangeEvent} from 'react-native';
import {styles} from './styles';
import type { HorizontalListProps } from './types';

const HorizontalList = forwardRef<FlatList, HorizontalListProps>(({data, renderItem, keyExtractor, onScrollToEnd, scrollEnabled = true, onScroll, onContentSizeChange, onLayout}: HorizontalListProps, ref) => {
  const handleEndReached = () => {
    if (onScrollToEnd) {
      onScrollToEnd();
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (onScroll) {
      onScroll(event);
    }
  };

  const handleContentSizeChange = (width: number, height: number) => {
    if (onContentSizeChange) {
      onContentSizeChange(width, height);
    }
  };

  return (
    <FlatList
      ref={ref}
      data={data}
      renderItem={({item, index}) => renderItem(item, index)}
      keyExtractor={(item, index) => keyExtractor(item, index)}
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
      windowSize={5}
      initialNumToRender={5}
    />
  );
});

HorizontalList.displayName = 'HorizontalList';

export default HorizontalList;

