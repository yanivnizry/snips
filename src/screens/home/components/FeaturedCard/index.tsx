import React from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { FeaturedCardProps } from './types';
import { styles } from './styles';
import RankNumber from './RankNumber';
import SnipsImage from '@/components/SnipsImage';
import { ImageStyle } from 'react-native';
import { COLORS } from '@/services/constants/common';

const FeaturedCard: React.FC<FeaturedCardProps> = ({ title, rank, showBadges = false }) => {
  return (
    <View style={styles.card}>
      <SnipsImage
        source={{ uri: title.posterUrl }}
        style={styles.image}
        resizeMode="cover"
        loadingIndicatorSize="small"
      />
      <RankNumber rank={rank} />
      <LinearGradient
        colors={['#00000000', '#0E0E0E']}
        style={styles.bottomGradient}
        locations={[0.042, 1]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.2, y: 1 }}
      />
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

