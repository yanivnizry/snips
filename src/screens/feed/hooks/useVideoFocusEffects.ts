import { useEffect, useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import type { FeedItem as FeedItemType } from '@/services/types/ApiTypes';
import type { FeedItemRef } from '@/screens/Feed/components/FeedItem/types';

interface UseVideoFocusEffectsProps {
  feedItems: FeedItemType[];
  isScrolling: boolean;
  isFocused: boolean;
  getItemRef: (itemId: string) => React.RefObject<FeedItemRef | null>;
  currentVisibleItemRef: React.MutableRefObject<string | null>;
  currentPlayingRef: React.MutableRefObject<string | null>;
  itemRefs: React.MutableRefObject<Map<string, React.RefObject<FeedItemRef | null>>>;
  pauseAllVideos: () => void;
}

export const useVideoFocusEffects = ({
  feedItems,
  isScrolling,
  isFocused,
  getItemRef,
  currentVisibleItemRef,
  currentPlayingRef,
  itemRefs,
  pauseAllVideos,
}: UseVideoFocusEffectsProps) => {
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
    }, [feedItems, isScrolling, getItemRef, currentVisibleItemRef, currentPlayingRef]),
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
  }, [isFocused, itemRefs]);
};

