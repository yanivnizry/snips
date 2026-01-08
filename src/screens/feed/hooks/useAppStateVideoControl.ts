import { useEffect } from 'react';
import { AppState } from 'react-native';
import type { FeedItem as FeedItemType } from '@/services/types/ApiTypes';
import type { FeedItemRef } from '@/screens/Feed/components/FeedItem/types';
import { FEED } from '../constants';

interface UseAppStateVideoControlProps {
  feedItems: FeedItemType[];
  isFocusedRef: React.RefObject<boolean>;
  pauseAllVideos: (saveState?: boolean) => void;
  getItemRef: (itemId: string) => React.RefObject<FeedItemRef | null>;
  currentPlayingRef: React.RefObject<string | null>;
  currentVisibleItemRef: React.RefObject<string | null>;
  lastPlayingBeforeBackgroundRef: React.RefObject<string | null>;
}

export const useAppStateVideoControl = ({
  feedItems,
  isFocusedRef,
  pauseAllVideos,
  getItemRef,
  currentPlayingRef,
  currentVisibleItemRef,
  lastPlayingBeforeBackgroundRef,
}: UseAppStateVideoControlProps) => {

  useEffect(() => {
    let activeTimeoutId: NodeJS.Timeout | null = null;

    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        pauseAllVideos(true);
        if (activeTimeoutId) {
          clearTimeout(activeTimeoutId);
          activeTimeoutId = null;
        }
      } else if (nextAppState === 'active') {
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
          }, FEED.VIDEO_CONTROL.APP_STATE.RESTORE_DELAY);
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
  }, [pauseAllVideos, feedItems, getItemRef, isFocusedRef, currentPlayingRef, currentVisibleItemRef, lastPlayingBeforeBackgroundRef]);
};

