import React from 'react';
import {View, Text, Image} from 'react-native';
import type {CardProps} from './types';
import {styles} from './styles';
import {formatWatchCount} from '@/utils/formatUtils';

const Card: React.FC<CardProps> = ({title, size = 'medium', variant = 'default'}) => {
  const isGrid = variant === 'grid';
  const cardStyle = isGrid ? styles.gridCard : styles.card;
  const imageStyle = isGrid ? styles.gridImage : styles.image;
  const contentStyle = isGrid ? styles.gridContent : styles.content;
  const watchContainerStyle = isGrid ? styles.gridWatchContainer : styles.watchContainer;

  return (
    <View style={cardStyle}>
      <Image source={{uri: title.posterUrl}} style={imageStyle} resizeMode="cover" />
      <View style={contentStyle}>
        <Text style={styles.title} numberOfLines={2}>
          {title.nameEn}
        </Text>
        {title.genres.length > 0 && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {title.genres[0]}
          </Text>
        )}
      </View>
      <View style={watchContainerStyle}>
        <Image
          source={require('@/assets/images/eye.png')}
          style={styles.eyeIcon}
          resizeMode="contain"
        />
        <Text style={styles.watchText}>{formatWatchCount(title.snipsCount)}</Text>
      </View>
    </View>
  );
};

export default React.memo(Card);

