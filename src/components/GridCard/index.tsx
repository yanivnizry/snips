import React from 'react';
import {View, Text, Image} from 'react-native';
import type {GridCardProps} from './types';
import {styles} from './styles';

const GridCard: React.FC<GridCardProps> = ({title}) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: title.posterUrl}} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title.nameEn}
        </Text>
        {title.genres.length > 0 && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {title.genres[0]}
          </Text>
        )}
      </View>
    </View>
  );
};

export default React.memo(GridCard);

