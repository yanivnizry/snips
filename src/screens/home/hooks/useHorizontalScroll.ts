import { SCROLL_CONSTANTS } from '@/services/constants/common';
import { useRef, useCallback, useState, useEffect } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, LayoutChangeEvent } from 'react-native';

interface UseHorizontalScrollOptions {
  externalRefCallback?: (ref: FlatList | null) => void;
}

export const useHorizontalScroll = (options?: UseHorizontalScrollOptions) => {
  const listRef = useRef<FlatList>(null);
  const externalRefCallbackRef = useRef(options?.externalRefCallback);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [layoutWidth, setLayoutWidth] = useState(0);

  useEffect(() => {
    externalRefCallbackRef.current = options?.externalRefCallback;
  }, [options?.externalRefCallback]);

  const combinedRef = useCallback((ref: FlatList | null) => {
    if (listRef && 'current' in listRef) {
      (listRef as { current: FlatList | null }).current = ref;
    }
    if (externalRefCallbackRef.current) {
      externalRefCallbackRef.current(ref);
    }
  }, []);

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
    listRef: combinedRef,
    handleScroll,
    handleContentSizeChange,
    handleLayout,
    handleArrowPress,
  };
};

