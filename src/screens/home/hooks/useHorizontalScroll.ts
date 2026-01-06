import { SCROLL_CONSTANTS } from '@/services/constants/common';
import { useRef, useCallback, useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, LayoutChangeEvent } from 'react-native';

export const useHorizontalScroll = () => {
  const listRef = useRef<FlatList>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [layoutWidth, setLayoutWidth] = useState(0);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(event.nativeEvent.contentOffset.x);
  }, []);

  const handleContentSizeChange = useCallback((width: number) => {
    setContentWidth(width);
  }, []);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setLayoutWidth(event.nativeEvent.layout.width);
  }, []);

  const handleArrowPress = useCallback(() => {
    if (listRef.current) {
      if (contentWidth > 0 && layoutWidth > 0) {
        const maxScrollOffset = Math.max(0, contentWidth - layoutWidth);
        const newOffset = Math.min(scrollOffset + SCROLL_CONSTANTS.SCROLL_OFFSET, maxScrollOffset);

        if (newOffset >= maxScrollOffset - 1) {
          listRef.current.scrollToEnd({ animated: true });
        } else {
          listRef.current.scrollToOffset({ offset: newOffset, animated: true });
        }
      } else {
        listRef.current.scrollToOffset({ offset: scrollOffset + SCROLL_CONSTANTS.SCROLL_OFFSET, animated: true });
      }
    }
  }, [scrollOffset, contentWidth, layoutWidth]);

  return {
    listRef,
    handleScroll,
    handleContentSizeChange,
    handleLayout,
    handleArrowPress,
  };
};

