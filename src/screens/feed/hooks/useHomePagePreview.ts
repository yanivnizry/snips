import { useEffect, useRef } from 'react';
import type { FeedItem as FeedItemType } from '@/services/types/ApiTypes';
import type { FeedItemRef } from '@/screens/Feed/components/FeedItem/types';
import { FEED } from '../constants';

interface UseHomePagePreviewProps {
  feedItems: FeedItemType[];
  isFocused: boolean;
  getItemRef: (itemId: string) => React.RefObject<FeedItemRef | null>;
  currentPlayingRef: React.RefObject<string | null>;
  currentVisibleItemRef: React.RefObject<string | null>;
}

export const useHomePagePreview = ({
  feedItems,
  isFocused,
  getItemRef,
  currentPlayingRef,
  currentVisibleItemRef,
}: UseHomePagePreviewProps) => {
  const hasPlayedHomePreviewRef = useRef(false);

  useEffect(() => {
    if (feedItems.length > 0 && !currentPlayingRef.current && !isFocused && !hasPlayedHomePreviewRef.current) {
      const firstItem = feedItems[0];
      if (firstItem && firstItem.video_playback_url) {
        hasPlayedHomePreviewRef.current = true;
        let stopTimeoutId: NodeJS.Timeout | null = null;
        let retryTimeoutId: NodeJS.Timeout | null = null;
        let pauseRetryTimeoutId: NodeJS.Timeout | null = null;

        const checkAndSetupVideo = () => {
          const ref = getItemRef(firstItem.id);
          if (!ref.current) {
            return false;
          }

          const isAlreadyPlaying = ref.current.isPlaying();

          if (ref.current.setMuted) {
            ref.current.setMuted(true);
          }

          if (!isAlreadyPlaying) {
            ref.current.play();
          }

          currentPlayingRef.current = firstItem.id;
          currentVisibleItemRef.current = firstItem.id;

          stopTimeoutId = setTimeout(() => {
            if (ref.current) {
              ref.current.pause();
              
              pauseRetryTimeoutId = setTimeout(() => {
                if (ref.current && ref.current.isPlaying()) {
                  ref.current.pause();
                }
                pauseRetryTimeoutId = null;
              }, FEED.VIDEO_CONTROL.HOME_PREVIEW.RETRY_PAUSE_DELAY);
              
              currentPlayingRef.current = null;
            }
          }, FEED.VIDEO_CONTROL.HOME_PREVIEW.PREVIEW_DURATION);

          return true;
        };

        const playTimeoutId = setTimeout(() => {
          if (!checkAndSetupVideo()) {
            retryTimeoutId = setTimeout(() => {
              checkAndSetupVideo();
            }, FEED.VIDEO_CONTROL.HOME_PREVIEW.RETRY_DELAY);
          }
        }, FEED.VIDEO_CONTROL.HOME_PREVIEW.INITIAL_DELAY);

        return () => {
          clearTimeout(playTimeoutId);
          if (stopTimeoutId) {
            clearTimeout(stopTimeoutId);
          }
          if (retryTimeoutId) {
            clearTimeout(retryTimeoutId);
          }
          if (pauseRetryTimeoutId) {
            clearTimeout(pauseRetryTimeoutId);
          }
        };
      }
    }
  }, [feedItems, isFocused, getItemRef, currentPlayingRef, currentVisibleItemRef]);
};

