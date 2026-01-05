import React, { forwardRef } from 'react';
import {FlatList} from 'react-native';
import {styles} from './styles';
import type { HorizontalListProps } from './types.ts';

const HorizontalList = forwardRef<FlatList, HorizontalListProps>(({data, renderItem, keyExtractor, onScrollToEnd, scrollEnabled = true}: HorizontalListProps, ref) => {
  const handleEndReached = () => {
    if (onScrollToEnd) {
      onScrollToEnd();
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

