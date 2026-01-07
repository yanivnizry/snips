import React from 'react';
import {View, Text, Image} from 'react-native';
import type {FeaturedCardProps} from './types';
import {styles} from './styles';
import RankNumber from './RankNumber';
import SnipsImage from '@/components/SnipsImage';
import { ImageStyle } from 'react-native';

const FeaturedCard: React.FC<FeaturedCardProps> = ({title, rank, showBadges = false}) => {
  return (
    <View style={styles.card}>
      <SnipsImage
        source={{uri: title.posterUrl}}
        style={styles.image}
        resizeMode="cover"
        loadingIndicatorSize="small"
      />
      <RankNumber rank={rank} />
      <View style={styles.overlay} />
      <View style={styles.speakerIconContainer}>
        <Image
          source={require('@/assets/images/volume-off.png')}
          style={styles.speakerIcon as ImageStyle}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        {title?.genres?.length > 0 && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {title?.genres?.join(' ')}
          </Text>
        )}
        <Text style={styles.title} numberOfLines={1}>
          {title.nameEn}
        </Text>
        {showBadges && title?.badges?.length > 0 && (
          <View style={styles.badgesContainer}>
            {title?.badges?.map(badge => (
              <View key={badge.id} style={styles.badge}>
                <Text style={styles.badgeText}>{badge.name}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default FeaturedCard;

