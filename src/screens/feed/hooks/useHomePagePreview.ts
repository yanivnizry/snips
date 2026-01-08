import { useEffect, useRef } from 'react';
import type { FeedItem as FeedItemType } from '@/services/types/ApiTypes';
import type { FeedItemRef } from '@/screens/Feed/components/FeedItem/types';

interface UseHomePagePreviewProps {
  feedItems: FeedItemType[];
  isFocused: boolean;
  getItemRef: (itemId: string) => React.RefObject<FeedItemRef | null>;
  currentPlayingRef: React.MutableRefObject<string | null>;
  currentVisibleItemRef: React.MutableRefObject<string | null>;
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
  }, [feedItems, isFocused, getItemRef, currentPlayingRef, currentVisibleItemRef]);
};

