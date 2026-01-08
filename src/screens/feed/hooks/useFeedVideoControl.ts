import React, { useCallback, useRef, useState, useEffect } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, AppState } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { FeedItem as FeedItemType } from '@/services/types/ApiTypes';
import type { FeedItemRef } from '@/screens/Feed/components/FeedItem/types';

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
  const hasPlayedHomePreviewRef = useRef(false);

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
      }, 30);
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
    if (feedItems.length > 0 && !currentPlayingRef.current && !isFocused && !hasPlayedHomePreviewRef.current) {
      const firstItem = feedItems[0];
      if (firstItem && firstItem.video_playback_url) {
        hasPlayedHomePreviewRef.current = true;
        console.log('[HOME PLAY] Setting up auto-play for first video from home page (startup only):', firstItem.id);
        let stopTimeoutId: NodeJS.Timeout | null = null;
        let retryTimeoutId: NodeJS.Timeout | null = null;

        const checkAndSetupVideo = () => {
          const ref = getItemRef(firstItem.id);
          if (!ref.current) {
            console.log('[HOME PLAY] Ref not available yet, retrying...', firstItem.id);
            return false;
          }

          const isAlreadyPlaying = ref.current.isPlaying();
          console.log('[HOME PLAY] Ref available, isPlaying:', isAlreadyPlaying, firstItem.id);

          if (ref.current.setMuted) {
            ref.current.setMuted(true);
            console.log('[HOME PLAY] Video muted for preview:', firstItem.id);
          }

          if (!isAlreadyPlaying) {
            console.log('[HOME PLAY] Auto-playing first video from home page (muted, 150ms preview):', firstItem.id);
            ref.current.play();
          } else {
            console.log('[HOME PLAY] Video already playing from autoPlay, will pause after 150ms:', firstItem.id);
          }

          currentPlayingRef.current = firstItem.id;
          currentVisibleItemRef.current = firstItem.id;

          stopTimeoutId = setTimeout(() => {
            if (ref.current) {
              const wasPlaying = ref.current.isPlaying();
              console.log('[VIDEO PAUSE] Attempting to pause video from home page auto-preview:', firstItem.id, 'wasPlaying:', wasPlaying);
              ref.current.pause();
              let isPlayingAfterPause = ref.current.isPlaying();
              console.log('[VIDEO PAUSE] Pause called, isPlaying after pause:', isPlayingAfterPause);
              
              setTimeout(() => {
                if (ref.current && ref.current.isPlaying()) {
                  console.log('[VIDEO PAUSE] Video was still playing, pausing again:', firstItem.id);
                  ref.current.pause();
                }
              }, 50);
              
              currentPlayingRef.current = null;
              console.log('[HOME PLAY] Auto-stopped first video preview after 150ms:', firstItem.id);
            } else {
              console.log('[VIDEO PAUSE] Ref is null, cannot pause:', firstItem.id);
            }
          }, 150);

          return true;
        };

        const playTimeoutId = setTimeout(() => {
          if (!checkAndSetupVideo()) {
            retryTimeoutId = setTimeout(() => {
              if (!checkAndSetupVideo()) {
                console.log('[HOME PLAY] Failed to setup video after retry:', firstItem.id);
              }
            }, 100);
          }
        }, 100);

        return () => {
          clearTimeout(playTimeoutId);
          if (stopTimeoutId) {
            clearTimeout(stopTimeoutId);
          }
          if (retryTimeoutId) {
            clearTimeout(retryTimeoutId);
          }
        };
      }
    }
  }, [feedItems, isFocused, getItemRef]);

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
        console.log('[VIDEO] App state changed to background/inactive - pausing videos');
        pauseAllVideos(true);
        if (activeTimeoutId) {
          clearTimeout(activeTimeoutId);
          activeTimeoutId = null;
        }
      } else if (nextAppState === 'active') {
        console.log('[VIDEO] App state changed to active - restoring video playback');
        if (isFocusedRef.current && feedItems.length > 0) {
          activeTimeoutId = setTimeout(() => {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                let itemToPlay: FeedItemType | undefined;

                if (lastPlayingBeforeBackgroundRef.current) {
                  itemToPlay = feedItems.find(
                    (item) => item.id === lastPlayingBeforeBackgroundRef.current,
                  );
                }

                if (!itemToPlay && currentVisibleItemRef.current) {
                  itemToPlay = feedItems.find((item) => item.id === currentVisibleItemRef.current);
                }

                if (!itemToPlay) {
                  itemToPlay = feedItems[0];
                }

                if (itemToPlay && itemToPlay.video_playback_url && isFocusedRef.current) {
                  const ref = getItemRef(itemToPlay.id);
                  if (ref.current && !ref.current.isPlaying()) {
                    console.log('[VIDEO PLAY] Restoring video after app state change:', itemToPlay.id);
                    ref.current.play();
                    currentPlayingRef.current = itemToPlay.id;
                    currentVisibleItemRef.current = itemToPlay.id;
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
            if (!isScrolling && feedItems.length > 0) {
              const itemToPlay = currentVisibleItemRef.current
                ? feedItems.find((item) => item.id === currentVisibleItemRef.current)
                : feedItems[0];

              if (itemToPlay && itemToPlay.video_playback_url) {
                const ref = getItemRef(itemToPlay.id);
                if (ref.current) {
                  if (ref.current.setMuted) {
                    ref.current.setMuted(false);
                  }
                  if (!ref.current.isPlaying()) {
                    console.log('[VIDEO PLAY] Playing video on focus effect:', itemToPlay.id);
                    ref.current.play();
                    currentPlayingRef.current = itemToPlay.id;
                  }
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
        console.log('[VIDEO] Focus effect cleanup - pausing all videos');
        pauseAllVideos();
      };
    }, [pauseAllVideos]),
  );

  useEffect(() => {
    if (isFocused) {
      console.log('[VIDEO] Feed focused - unmuting all videos');
      itemRefs.current.forEach((ref) => {
        if (ref.current && ref.current.setMuted) {
          ref.current.setMuted(false);
        }
      });
    } else {
      console.log('[VIDEO] Feed unfocused - muting all videos');
      itemRefs.current.forEach((ref) => {
        if (ref.current && ref.current.setMuted) {
          ref.current.setMuted(true);
        }
      });
    }
  }, [isFocused]);

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

