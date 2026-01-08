import React, { forwardRef } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import Video from 'react-native-video';
import type { FeedItemProps, FeedItemRef } from './types';
import { styles } from './styles';
import ExpandableDescription from '../ExpandableDescription';
import SideIcons from './SideIcons';
import SnipsImage from '@/components/SnipsImage';
import { MAX_DESCRIPTION_LENGTH } from '@/constants/common';
import { FEED } from '../../constants';
import { useFeedItem } from './hooks/useFeedItem';

const FeedItem = forwardRef<FeedItemRef, FeedItemProps>((props, ref) => {
  const { item } = props;
  const {
    isPlaying,
    hasError,
    hasVideo,
    shouldShowPlayButton,
    dynamicStyles,
    videoRef,
    titleRef,
    titleHeight,
    isMuted,
    handlePlayPress,
    handleVideoPress,
    handleVideoEnd,
    handleVideoError,
    handleVideoLoad,
    handleTitleLayout,
  } = useFeedItem(props, ref);

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
            poster={item.poster_url}
          />
          <Pressable 
            onPress={handleVideoPress} 
            style={shouldShowPlayButton ? styles.playButtonOverlay : dynamicStyles.videoPressAreaTop}
          >
            {shouldShowPlayButton && (
              <Image
                source={require('@/assets/images/play.png')}
                style={styles.playButtonIcon}
                resizeMode="contain"
              />
            )}
          </Pressable>
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
                style={styles.titleContainer}
                onLayout={handleTitleLayout}>
            <Text style={styles.title} numberOfLines={FEED.FEED_ITEM.TITLE_NUMBER_OF_LINES}>
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

