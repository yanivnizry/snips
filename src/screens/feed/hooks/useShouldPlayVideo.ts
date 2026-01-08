import { useMemo } from 'react';
import { useNavigationState } from '@react-navigation/native';
import { useVideoStore } from '@/services/stores/useVideoStore';

/**
 * Hook that determines if videos should play based on the current route
 * Videos should only play when:
 * - The Feed (ForYou) tab is the active route
 * - The app is in the foreground (not in background/inactive)
 * - Not currently scrolling
 */
export const useShouldPlayVideo = (): {
  readonly shouldPlay: boolean;
  readonly isFeedFocused: boolean;
} => {
  const navigationState = useNavigationState((state) => state);
  const isFeedFocused = useVideoStore((state) => state.isFeedFocused);
  const isScrolling = useVideoStore((state) => state.isScrolling);

  const shouldPlay = useMemo(() => {
    // Check if Feed (ForYou) tab is the active route
    if (!navigationState) {
      return false;
    }

    const route = navigationState.routes[navigationState.index];
    const isForYouRoute = route?.name === 'ForYou';

    // Videos should play only if:
    // 1. Feed page is focused (ForYou route is active)
    // 2. Not currently scrolling
    return isForYouRoute && isFeedFocused && !isScrolling;
  }, [navigationState, isFeedFocused, isScrolling]);

  return {
    shouldPlay,
    isFeedFocused,
  };
};

