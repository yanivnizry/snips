import React, { useCallback, useRef, useState, useEffect } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import type { FeedItem as FeedItemType } from '@/services/types/ApiTypes';
import type { FeedItemRef } from '@/screens/Feed/components/FeedItem/types';
import { useHomePagePreview } from './useHomePagePreview';
import { useAppStateVideoControl } from './useAppStateVideoControl';
import { useVideoFocusEffects } from './useVideoFocusEffects';
import { FEED_CONSTANTS } from '../constants';

interface UseFeedVideoControlProps {
  feedItems: FeedItemType[];
  isFocused: boolean;
}

interface UseFeedVideoControlReturn {
  itemRefs: React.RefObject<Map<string, React.RefObject<FeedItemRef | null>>>;
  getItemRef: (itemId: string) => React.RefObject<FeedItemRef | null>;
  isScrolling: boolean;
  handleViewableItemsChanged: (info: {
    viewableItems: Array<{ item: FeedItemType; key: string }>;
  }) => void;
  handleScrollBeginDrag: () => void;
  handleScrollEndDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  handleMomentumScrollEnd: () => void;
}

export const useFeedVideoControl = ({
  feedItems,
  isFocused,
}: UseFeedVideoControlProps): UseFeedVideoControlReturn => {
  const itemRefs = useRef<Map<string, React.RefObject<FeedItemRef | null>>>(new Map());
  const currentPlayingRef = useRef<string | null>(null);
  const currentVisibleItemRef = useRef<string | null>(null);
  const lastPlayingBeforeBackgroundRef = useRef<string | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const playTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFocusedRef = useRef(false);

  useEffect(() => {
    isFocusedRef.current = isFocused;
  }, [isFocused]);

  const getItemRef = useCallback((itemId: string): React.RefObject<FeedItemRef | null> => {
    if (!itemRefs.current.has(itemId)) {
      itemRefs.current.set(itemId, React.createRef<FeedItemRef | null>());
    }
    return itemRefs.current.get(itemId)!;
  }, []);

  const pauseAllVideos = useCallback((saveState = false) => {
    if (saveState && currentPlayingRef.current) {
      lastPlayingBeforeBackgroundRef.current = currentPlayingRef.current;
      console.log('[VIDEO PAUSE] Saving state before pause, last playing:', currentPlayingRef.current);
    }
    let pausedCount = 0;
    itemRefs.current.forEach((ref, itemId) => {
      if (ref.current && ref.current.isPlaying()) {
        ref.current.pause();
        pausedCount++;
        console.log('[VIDEO PAUSE] Paused video:', itemId);
      }
    });
    if (pausedCount > 0) {
      console.log('[VIDEO PAUSE] Total videos paused:', pausedCount);
    }
    if (!saveState) {
      if (currentPlayingRef.current) {
        console.log('[VIDEO PAUSE] Cleared current playing ref:', currentPlayingRef.current);
      }
      currentPlayingRef.current = null;
    }
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
      playTimeoutRef.current = null;
    }
  }, []);

  const playVisibleVideo = useCallback(
    (itemId: string) => {
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current);
      }

      playTimeoutRef.current = setTimeout(() => {
        if (!isScrolling) {
          const ref = getItemRef(itemId);
          if (ref.current) {
            console.log('[VIDEO PLAY] Starting playback for video:', itemId);
            ref.current.play();
            currentPlayingRef.current = itemId;
            console.log('[VIDEO PLAY] Video playback started:', itemId);
          }
        } else {
          console.log('[VIDEO PLAY] Skipped playback - currently scrolling:', itemId);
        }
      }, FEED_CONSTANTS.VIDEO_CONTROL.PLAY_DELAY);
    },
    [isScrolling, getItemRef],
  );

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<{ item: FeedItemType; key: string }> }) => {
      if (isScrolling) {
        return;
      }

      const viewableItemIds = new Set(viewableItems.map((vi) => vi.item.id));

      itemRefs.current.forEach((ref, itemId) => {
        if (!viewableItemIds.has(itemId) && ref.current) {
          if (ref.current.isPlaying()) {
            console.log('[VIDEO PAUSE] Pausing video - no longer visible:', itemId);
            ref.current.pause();
          }
        }
      });

      if (viewableItems.length > 0) {
        const firstVisible = viewableItems[0];
        currentVisibleItemRef.current = firstVisible.item.id;

        if (firstVisible.item.video_playback_url) {
          const firstVisibleId = firstVisible.item.id;

          itemRefs.current.forEach((ref, itemId) => {
            if (itemId !== firstVisibleId && ref.current) {
              if (ref.current.isPlaying()) {
                console.log('[VIDEO PAUSE] Pausing video - switching to new visible item:', itemId);
                ref.current.pause();
              }
            }
          });

          const ref = getItemRef(firstVisibleId);
          if (ref.current) {
            if (ref.current.setMuted && isFocused) {
              ref.current.setMuted(false);
            }
            if (!ref.current.isPlaying()) {
              playVisibleVideo(firstVisibleId);
            }
          }
        } else {
          pauseAllVideos();
        }
      } else {
        currentVisibleItemRef.current = null;
        pauseAllVideos();
      }
    },
    [isScrolling, pauseAllVideos, playVisibleVideo, getItemRef, isFocused],
  );

  const handleScrollBeginDrag = useCallback(() => {
    console.log('[VIDEO] Scroll begin drag - pausing all videos');
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
  }, []);

  useEffect(() => {
    return () => {
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current);
      }
    };
  }, []);

  useHomePagePreview({
    feedItems,
    isFocused,
    getItemRef,
    currentPlayingRef,
    currentVisibleItemRef,
  });

  useAppStateVideoControl({
    feedItems,
    isFocusedRef,
    pauseAllVideos,
    getItemRef,
    currentPlayingRef,
    currentVisibleItemRef,
    lastPlayingBeforeBackgroundRef,
  });

  useVideoFocusEffects({
    feedItems,
    isScrolling,
    isFocused,
    getItemRef,
    currentVisibleItemRef,
    currentPlayingRef,
    itemRefs,
    pauseAllVideos,
  });

  return {
    itemRefs,
    getItemRef,
    isScrolling,
    handleViewableItemsChanged,
    handleScrollBeginDrag,
    handleScrollEndDrag,
    handleMomentumScrollEnd,
  };
};

