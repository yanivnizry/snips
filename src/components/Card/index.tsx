import React from 'react';
import {View, Text, Image} from 'react-native';
import type {CardProps} from './types';
import {styles} from './styles';
import {formatWatchCount} from '@/utils/formatUtils';
import SnipsImage from '@/components/SnipsImage';

const Card: React.FC<CardProps> = ({title, componentType}) => {
  const isGrid = componentType === 'MORE_TITLES';
  const cardStyle = isGrid ? styles.gridCard : styles.card;
  const imageStyle = isGrid ? styles.gridImage : styles.image;
  const contentStyle = isGrid ? styles.gridContent : styles.content;
  const watchContainerStyle = isGrid ? styles.gridWatchContainer : styles.watchContainer;

  return (
    <View style={cardStyle}>
      <SnipsImage
        source={{uri: title.posterUrl}}
        style={imageStyle}
        resizeMode="cover"
        loadingIndicatorSize="small"
      />
      {!isGrid && (
        <View style={contentStyle}>
          {title?.genres?.length > 0 && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {title?.genres?.join(' ')}
            </Text>
          )}
          <Text style={styles.title} numberOfLines={2}>
            {title.nameEn}
          </Text>
        </View>
      )}
      {title?.snipsCount > 0 && (
        <View style={watchContainerStyle}>
          <Image
            source={require('@/assets/images/eye.png')}
            style={styles.eyeIcon}
            resizeMode="contain"
          />
          <Text style={styles.watchText}>{formatWatchCount(title.snipsCount)}</Text>
        </View>
      )}
    </View>
  );
};

export default React.memo(
  Card,
  (prevProps, nextProps) =>
    prevProps.title.id === nextProps.title.id &&
    prevProps.componentType === nextProps.componentType,
);

