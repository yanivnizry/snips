import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {FeedItemProps} from './types';
import {styles} from './styles';
import ExpandableDescription from '../ExpandableDescription';
import SideIcons from './SideIcons';
import {DEVICE_WIDTH, DEVICE_HEIGHT, BOTTOM_TAB_BAR_HEIGHT, DIMENSIONS} from '@/services/constants/common';

const FeedItem: React.FC<FeedItemProps> = ({item}) => {
  const insets = useSafeAreaInsets();
  const availableHeight = DEVICE_HEIGHT - (BOTTOM_TAB_BAR_HEIGHT + insets.bottom);
  const cardHeight = Math.min(DEVICE_WIDTH * DIMENSIONS.FEED.ASPECT_RATIO, availableHeight);

  return (
    <View style={[styles.card, {height: cardHeight}]}>
      <Image source={{ uri: item.poster_url }} style={[styles.image, {height: cardHeight}]} resizeMode="cover" />
      <View style={[styles.overlay, {height: cardHeight}]} />
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
            <Text style={styles.title} numberOfLines={2}>
              {item.name_en}
            </Text>
              <ExpandableDescription description={item.captions_en} maxLength={175} />
            </View>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.watchNowButton}>
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
};

export default React.memo(
  FeedItem,
  (prevProps, nextProps) => prevProps.item.id === nextProps.item.id,
);

