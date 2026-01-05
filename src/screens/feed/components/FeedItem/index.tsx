import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import type {FeedItemProps} from './types';
import {styles} from './styles';
import ExpandableDescription from '../ExpandableDescription';
import SideIcons from './SideIcons';

const FeedItem: React.FC<FeedItemProps> = ({item}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.poster_url }} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay} />
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

