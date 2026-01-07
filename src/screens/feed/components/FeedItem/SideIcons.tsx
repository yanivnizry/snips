import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {formatWatchCount} from '@/utils/formatUtils';
import {styles} from './styles';
import type {FeedItem} from '@/services/types/ApiTypes';

interface SideIconsProps {
  readonly item: FeedItem;
}

const SideIcons: React.FC<SideIconsProps> = ({item}) => {
  return (
    <View style={styles.sideIcons}>
      <TouchableOpacity style={styles.sideIconButton}>
        <Image
          source={require('@/assets/images/bookmark.png')}
          style={styles.sideIcon}
          resizeMode="contain"
        />
        <Text style={styles.sideIconText}>{formatWatchCount(item.rank)}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sideIconButton}>
        <Image
          source={require('@/assets/images/list.png')}
          style={styles.sideIcon}
          resizeMode="contain"
        />
        <Text style={styles.sideIconText}>Episodes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sideIconButton}>
        <Image
          source={require('@/assets/images/share.png')}
          style={styles.sideIcon}
          resizeMode="contain"
        />
        <Text style={styles.sideIconText}>Share</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sideIconButton}>
        <Image
          source={require('@/assets/images/more-hor.png')}
          style={styles.sideIconSmall}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(SideIcons, (prevProps, nextProps) => prevProps.item.id === nextProps.item.id);

