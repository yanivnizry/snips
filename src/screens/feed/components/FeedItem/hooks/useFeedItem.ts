import { useState, useRef, useEffect, useMemo, useImperativeHandle } from 'react';
import { View } from 'react-native';
import type { VideoRef } from 'react-native-video';
import type { FeedItemProps, FeedItemRef } from '../types';
import { scaleHeight } from '@/services/constants/common';
import { FEED } from '../../../constants';
import { styles } from '../styles';

const CONTENT_BOTTOM_OFFSET = scaleHeight(FEED.FEED_ITEM.CONTENT_BOTTOM_OFFSET);
const CONTENT_HEIGHT = scaleHeight(FEED.FEED_ITEM.CONTENT_HEIGHT);

export const useFeedItem = (
  { item, scrollHeight, isScrolling = false, autoPlay = false, muted = false }: FeedItemProps,
  ref: React.ForwardedRef<FeedItemRef>,
) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [hasError, setHasError] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [titleHeight, setTitleHeight] = useState(0);
  const [isMuted, setIsMuted] = useState(muted);
  const videoRef = useRef<VideoRef>(null);
  const titleRef = useRef<View>(null);

  useEffect(() => {
    setIsMuted(muted);
  }, [muted]);

  const hasVideo = Boolean(item.video_playback_url);
  const shouldShowPlayButton = !isPlaying && !isScrolling && hasStarted;

  const dynamicStyles = useMemo(
    () => ({
      card: [styles.card, { height: scrollHeight }],
      video: [styles.video, { height: scrollHeight }],
      image: [styles.image, { height: scrollHeight }],
      videoPressAreaTop: [
        styles.videoPressAreaTop,
        {
          height: scrollHeight - CONTENT_HEIGHT - CONTENT_BOTTOM_OFFSET,
          bottom: CONTENT_HEIGHT + CONTENT_BOTTOM_OFFSET,
        },
      ],
    }),
    [scrollHeight],
  );

  const handlePlayPress = () => {
    if (hasVideo) {
      setIsPlaying(true);
      setHasStarted(true);
      setHasError(false);
    }
  };

  const handleVideoPress = () => {
    if (hasVideo) {
      if (isPlaying) {
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
        setHasStarted(true);
      }
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const handleVideoError = () => {
    setIsPlaying(false);
    setHasError(true);
  };

  const handleVideoLoad = () => {
    setHasError(false);
    setHasStarted(true);
  };

  const handleTitleLayout = (event: { nativeEvent: { layout: { height: number } } }) => {
    const { height } = event.nativeEvent.layout;
    setTitleHeight(height);
  };

  useEffect(() => {
    if (autoPlay && hasVideo && !hasError && !hasStarted) {
      const timer = setTimeout(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }, FEED.FEED_ITEM.AUTO_PLAY_DELAY);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, hasVideo, hasError, hasStarted]);

  useEffect(() => {
    return () => {
      setIsPlaying(false);
      if (videoRef.current) {
        try {
          videoRef.current.seek(0);
        } catch (error) {
            console.warn('Error seeking video on cleanup:', error);
        }
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (hasVideo && !hasError) {
        setIsPlaying(true);
        setHasStarted(true);
      }
    },
    pause: () => {
      setIsPlaying(false);
    },
    isPlaying: () => isPlaying,
    setMuted: (mutedValue: boolean) => {
      setIsMuted(mutedValue);
    },
    isMuted: () => isMuted,
  }));

  return {
    isPlaying,
    hasError,
    hasStarted,
    titleHeight,
    isMuted,
    hasVideo,
    shouldShowPlayButton,
    dynamicStyles,
    videoRef,
    titleRef,
    handlePlayPress,
    handleVideoPress,
    handleVideoEnd,
    handleVideoError,
    handleVideoLoad,
    handleTitleLayout,
  };
};

