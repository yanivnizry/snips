import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, AppState } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useInfiniteFeedPage } from '@/services/queries/useInfiniteFeedPage';
import FeedItem from '@/screens/Feed/components/FeedItem';
import type { FeedScreenProps } from './types';
import { styles } from './styles';
import { COLORS } from '@/services/constants/common';
import type { FeedItem as FeedItemType } from '@/services/types/ApiTypes';
import { DEVICE_HEIGHT, isIPad, BOTTOM_TAB_BAR_HEIGHT } from '@/services/constants/common';
import type { FeedItemRef } from '@/screens/Feed/components/FeedItem/types';

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
  const isFocused = useIsFocused();
  const isFocusedRef = useRef(false);
  const SCROLL_HEIGHT = DEVICE_HEIGHT - BOTTOM_TAB_BAR_HEIGHT - insets.bottom;
  const itemRefs = useRef<Map<string, React.RefObject<FeedItemRef | null>>>(new Map());
  const currentPlayingRef = useRef<string | null>(null);
  const currentVisibleItemRef = useRef<string | null>(null);
  const lastPlayingBeforeBackgroundRef = useRef<string | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const playTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    isFocusedRef.current = isFocused;
  }, [isFocused]);

  const feedItems = useMemo(() => {
    return data?.pages.flatMap(page => page.feedTitles) || [];
  }, [data]);

  const getItemRef = useCallback((itemId: string): React.RefObject<FeedItemRef | null> => {
    if (!itemRefs.current.has(itemId)) {
      itemRefs.current.set(itemId, React.createRef<FeedItemRef | null>());
    }
    return itemRefs.current.get(itemId)!;
  }, []);

  const pauseAllVideos = useCallback((saveState = false) => {
    // Remember what was playing before pausing if saving state
    if (saveState && currentPlayingRef.current) {
      lastPlayingBeforeBackgroundRef.current = currentPlayingRef.current;
    }
    itemRefs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.pause();
      }
    });
    if (!saveState) {
      currentPlayingRef.current = null;
    }
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
      playTimeoutRef.current = null;
    }
  }, []);

  const playVisibleVideo = useCallback((itemId: string) => {
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
    }

    playTimeoutRef.current = setTimeout(() => {
      if (!isScrolling) {
        const ref = getItemRef(itemId);
        if (ref.current) {
          ref.current.play();
          currentPlayingRef.current = itemId;
        }
      }
    }, 30);
  }, [isScrolling, getItemRef]);

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<{ item: FeedItemType; key: string }> }) => {
      // Don't play videos while scrolling
      if (isScrolling) {
        return;
      }

      // Pause all videos that are not in the viewable items
      const viewableItemIds = new Set(viewableItems.map(vi => vi.item.id));

      // Pause videos for items that are no longer visible
      itemRefs.current.forEach((ref, itemId) => {
        if (!viewableItemIds.has(itemId) && ref.current) {
          ref.current.pause();
        }
      });

      // Play the first visible item if it has video (with 30ms delay)
      if (viewableItems.length > 0) {
        const firstVisible = viewableItems[0];
        currentVisibleItemRef.current = firstVisible.item.id;

        if (firstVisible.item.video_playback_url) {
          const firstVisibleId = firstVisible.item.id;

          // Only pause other videos, not the one we want to play
          itemRefs.current.forEach((ref, itemId) => {
            if (itemId !== firstVisibleId && ref.current) {
              ref.current.pause();
            }
          });

          // Only play if it's not already playing
          const ref = getItemRef(firstVisibleId);
          if (ref.current && !ref.current.isPlaying()) {
            playVisibleVideo(firstVisibleId);
          }
        } else {
          // No video in visible item, pause all
          pauseAllVideos();
        }
      } else {
        // No visible items, pause all
        currentVisibleItemRef.current = null;
        pauseAllVideos();
      }
    },
    [isScrolling, pauseAllVideos, playVisibleVideo, getItemRef],
  );

  const handleScrollBeginDrag = useCallback(() => {
    setIsScrolling(true);
    pauseAllVideos();
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
      playTimeoutRef.current = null;
    }
  }, [pauseAllVideos]);

  const handleScrollEndDrag = useCallback((_event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIsScrolling(false);
  }, []);

  const handleMomentumScrollEnd = useCallback(() => {
    setIsScrolling(false);
    // After scrolling completely stops, handleViewableItemsChanged will be triggered
    // which will play the video with 30ms delay
  }, []);

  useEffect(() => {
    return () => {
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let activeTimeoutId: NodeJS.Timeout | null = null;

    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        // Save the current playing state before pausing
        pauseAllVideos(true);
        if (activeTimeoutId) {
          clearTimeout(activeTimeoutId);
          activeTimeoutId = null;
        }
      } else if (nextAppState === 'active') {
        // When app comes to foreground, restore the saved playing state if available
        if (isFocusedRef.current && feedItems.length > 0) {
          activeTimeoutId = setTimeout(() => {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                // Priority: Restore the last playing video before background
                let itemToPlay: FeedItemType | undefined;

                if (lastPlayingBeforeBackgroundRef.current) {
                  itemToPlay = feedItems.find(item => item.id === lastPlayingBeforeBackgroundRef.current);
                }

                // Fallback to currently visible item if no saved state
                if (!itemToPlay && currentVisibleItemRef.current) {
                  itemToPlay = feedItems.find(item => item.id === currentVisibleItemRef.current);
                }

                // Final fallback to first item
                if (!itemToPlay) {
                  itemToPlay = feedItems[0];
                }

                if (itemToPlay && itemToPlay.video_playback_url && isFocusedRef.current) {
                  const ref = getItemRef(itemToPlay.id);
                  if (ref.current && !ref.current.isPlaying()) {
                    ref.current.play();
                    currentPlayingRef.current = itemToPlay.id;
                    currentVisibleItemRef.current = itemToPlay.id;
                    // Clear the saved state after restoring it
                    if (itemToPlay.id === lastPlayingBeforeBackgroundRef.current) {
                      lastPlayingBeforeBackgroundRef.current = null;
                    }
                  }
                }
                activeTimeoutId = null;
              });
            });
          }, 200);
        }
      }
    };

    // Check initial app state
    const currentState = AppState.currentState;
    if (currentState === 'background' || currentState === 'inactive') {
      pauseAllVideos();
    }

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
      if (activeTimeoutId) {
        clearTimeout(activeTimeoutId);
      }
    };
  }, [pauseAllVideos, feedItems, getItemRef]);

  useFocusEffect(
    useCallback(() => {
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!isScrolling) {
              // Play the currently visible item if available, otherwise play the first item
              const itemToPlay = currentVisibleItemRef.current
                ? feedItems.find(item => item.id === currentVisibleItemRef.current)
                : feedItems[0];

              if (itemToPlay && itemToPlay.video_playback_url) {
                const ref = getItemRef(itemToPlay.id);
                if (ref.current && !ref.current.isPlaying()) {
                  ref.current.play();
                  currentPlayingRef.current = itemToPlay.id;
                }
              }
            }
          });
        });
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    }, [feedItems, isScrolling, getItemRef]),
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        pauseAllVideos();
      };
    }, [pauseAllVideos]),
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 100,
  }).current;

  const renderItem = useCallback(
    ({ item }: { item: FeedItemType }) => {
      const itemRef = getItemRef(item.id);
      return <FeedItem ref={itemRef} item={item} scrollHeight={SCROLL_HEIGHT} isScrolling={isScrolling} />;

    }, [SCROLL_HEIGHT, getItemRef, isScrolling],
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
            {error instanceof Error ? error.message : 'Failed o load feed. Please try again later.'}
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
        onEndReachedThreshold={0.5}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEnabled={!isIPad}
        pagingEnabled={true}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        initialNumToRender={3}
        windowSize={3}
        scrollEventThrottle={16}
      />
  );
};

export default Feed;