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
    if (feedItems.length > FEED.ARRAY.EMPTY_LENGTH && !currentPlayingRef.current && !isFocused && !hasPlayedHomePreviewRef.current) {
      const firstItem = feedItems[FEED.ARRAY.FIRST_ITEM_INDEX];
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
            console.log(`[HOME PLAY] Auto-playing first video from home page (muted, ${FEED.VIDEO_CONTROL.HOME_PREVIEW.PREVIEW_DURATION}ms preview):`, firstItem.id);
            ref.current.play();
          } else {
            console.log(`[HOME PLAY] Video already playing from autoPlay, will pause after ${FEED.VIDEO_CONTROL.HOME_PREVIEW.PREVIEW_DURATION}ms:`, firstItem.id);
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
              }, FEED.VIDEO_CONTROL.HOME_PREVIEW.RETRY_PAUSE_DELAY);
              
              currentPlayingRef.current = null;
              console.log(`[HOME PLAY] Auto-stopped first video preview after ${FEED.VIDEO_CONTROL.HOME_PREVIEW.PREVIEW_DURATION}ms:`, firstItem.id);
            } else {
              console.log('[VIDEO PAUSE] Ref is null, cannot pause:', firstItem.id);
            }
          }, FEED.VIDEO_CONTROL.HOME_PREVIEW.PREVIEW_DURATION);

          return true;
        };

        const playTimeoutId = setTimeout(() => {
          if (!checkAndSetupVideo()) {
            retryTimeoutId = setTimeout(() => {
              if (!checkAndSetupVideo()) {
                console.log('[HOME PLAY] Failed to setup video after retry:', firstItem.id);
              }
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
        };
      }
    }
  }, [feedItems, isFocused, getItemRef, currentPlayingRef, currentVisibleItemRef]);
};

