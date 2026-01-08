import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import Video, { type VideoRef } from 'react-native-video';
import type { FeedItemProps, FeedItemRef } from './types';
import { styles } from './styles';
import ExpandableDescription from '../ExpandableDescription';
import SideIcons from './SideIcons';
import SnipsImage from '@/components/SnipsImage';
import { MAX_DESCRIPTION_LENGTH, scaleHeight } from '@/services/constants/common';
import { FEED_CONSTANTS } from '../../constants';

const CONTENT_BOTTOM_OFFSET = scaleHeight(FEED_CONSTANTS.FEED_ITEM.CONTENT_BOTTOM_OFFSET);
const CONTENT_HEIGHT = scaleHeight(FEED_CONSTANTS.FEED_ITEM.CONTENT_HEIGHT);

const FeedItem = forwardRef<FeedItemRef, FeedItemProps>(({ item, scrollHeight, isScrolling = false, autoPlay = false, muted = false }, ref) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [hasError, setHasError] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [wasPlaying, setWasPlaying] = useState(false);
  const [titleHeight, setTitleHeight] = useState(0);
  const [isMuted, setIsMuted] = useState(muted);
  const videoRef = useRef<VideoRef>(null);
  const titleRef = useRef<View>(null);

  useEffect(() => {
    setIsMuted(muted);
  }, [muted]);

  const hasVideo = Boolean(item.video_playback_url);
  const shouldShowPlayButton = !isPlaying && !isScrolling && wasPlaying && hasStarted;

  const dynamicStyles = useMemo(() => ({
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
  }), [scrollHeight]);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (hasVideo && !hasError) {
        setIsPlaying(true);
        setHasStarted(true);
        setWasPlaying(true);
      }
    },
    pause: () => {
      setIsPlaying(false);
    },
    isPlaying: () => isPlaying,
    setMuted: (muted: boolean) => {
      setIsMuted(muted);
    },
    isMuted: () => isMuted,
  }));

  const handlePlayPress = () => {
    if (hasVideo) {
      setIsPlaying(true);
      setHasStarted(true);
      setWasPlaying(true);
      setHasError(false);
    }
  };

  const handleVideoPress = () => {
    if (hasVideo) {
      if (isPlaying) {
        setIsPlaying(false);
        setWasPlaying(true);
      } else {
        setIsPlaying(true);
        setHasStarted(true);
        setWasPlaying(true);
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

  useEffect(() => {
    if (isPlaying && hasStarted) {
      setWasPlaying(true);
    }
  }, [isPlaying, hasStarted]);

  useEffect(() => {
    if (autoPlay && hasVideo && !hasError && !hasStarted) {
      const timer = setTimeout(() => {
        setIsPlaying(true);
        setHasStarted(true);
        setWasPlaying(true);
      }, FEED_CONSTANTS.FEED_ITEM.AUTO_PLAY_DELAY);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, hasVideo, hasError, hasStarted]);

  useEffect(() => {
    return () => {
      setIsPlaying(false);
    };
  }, []);

  return (
    <View style={dynamicStyles.card}>
      {hasVideo && !hasError && (
        <>
          <Video
            ref={videoRef}
            source={{ uri: item.video_playback_url }}
            style={dynamicStyles.video}
            resizeMode="cover"
            paused={!isPlaying}
            onEnd={handleVideoEnd}
            onError={handleVideoError}
            onLoad={handleVideoLoad}
            repeat={true}
            controls={false}
            muted={isMuted}
            playInBackground={false}
            playWhenInactive={false}
            ignoreSilentSwitch="ignore"
          />
          {shouldShowPlayButton ? (
            <Pressable onPress={handleVideoPress} style={styles.playButtonOverlay}>
              <Image
                source={require('@/assets/images/play.png')}
                style={styles.playButtonIcon}
                resizeMode="contain"
              />
            </Pressable>
          ) : (
            <Pressable 
              onPress={handleVideoPress} 
              style={dynamicStyles.videoPressAreaTop} 
            />
          )}
        </>
      )}
      {!hasVideo && (
      <SnipsImage
          source={{ uri: item.poster_url }}
          style={dynamicStyles.image}
          loadingIndicatorSize="large"
        resizeMode="cover"
      />
      )}
      <TouchableOpacity style={styles.backButton}>
        <Image
          source={require('@/assets/images/back.png')}
          style={styles.backIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <SideIcons item={item} />
      <View style={styles.content}>
        <View style={styles.contentRow}>
          <View style={styles.textContent}>
            <View style={styles.descriptionContainer}>
              <View
                ref={titleRef}
                style={{ position: 'relative', zIndex: 1 }}
                onLayout={(event) => {
                  const { height } = event.nativeEvent.layout;
                  setTitleHeight(height);
                }}>
            <Text style={styles.title} numberOfLines={FEED_CONSTANTS.FEED_ITEM.TITLE_NUMBER_OF_LINES}>
              {item.name_en}
            </Text>
              </View>
              <ExpandableDescription 
                description={item.captions_en} 
                maxLength={MAX_DESCRIPTION_LENGTH}
                titleHeight={titleHeight}
              />
            </View>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.watchNowButton} onPress={hasVideo ? handlePlayPress : undefined}>
            <Image
              source={require('@/assets/images/play.png')}
              style={styles.playIcon}
              resizeMode="contain"
            />
            <Text style={styles.watchNowText}>Watch Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

FeedItem.displayName = 'FeedItem';

export default React.memo(
  FeedItem,
  (prevProps, nextProps) => prevProps.item.id === nextProps.item.id && prevProps.scrollHeight === nextProps.scrollHeight,
);

