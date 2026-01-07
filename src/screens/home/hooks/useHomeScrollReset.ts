import { useRef, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native';

interface UseHomeScrollResetResult {
  readonly flatListRef: React.RefObject<FlatList | null>;
  readonly featuredListRef: React.RefObject<FlatList | null>;
  readonly setCategoryListRef: (id: string, ref: FlatList | null) => void;
}

export const useHomeScrollReset = (): UseHomeScrollResetResult => {
  const flatListRef = useRef<FlatList>(null);
  const featuredListRef = useRef<FlatList>(null);
  const categoryListRefs = useRef<Map<string, FlatList | null>>(new Map());

  const setCategoryListRef = useCallback((id: string, ref: FlatList | null) => {
    if (ref) {
      categoryListRefs.current.set(id, ref);
    } else {
      categoryListRefs.current.delete(id);
    }
  }, []);

  const resetAllScrolls = useCallback(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    featuredListRef.current?.scrollToOffset({ offset: 0, animated: false });
    categoryListRefs.current.forEach((ref: FlatList | null) => {
      ref?.scrollToOffset({ offset: 0, animated: false });
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            resetAllScrolls();
          });
        });
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    }, [resetAllScrolls]),
  );

  return {
    flatListRef,
    featuredListRef,
    setCategoryListRef,
  };
};
