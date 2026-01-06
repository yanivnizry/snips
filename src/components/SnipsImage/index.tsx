import React, {useState} from 'react';
import {View, Text, Image, ActivityIndicator, StyleSheet} from 'react-native';
import type {SnipsImageProps} from './types';
import {styles} from './styles';
import {COLORS} from '@/services/constants/common';

const SnipsImage: React.FC<SnipsImageProps> = ({
  source,
  style,
  placeholderText = 'No Image',
  loadingIndicatorSize = 'small',
  showLoadingIndicator = true,
  resizeMode = 'cover',
  ...restProps
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const isUriSource = typeof source === 'object' && 'uri' in source && source.uri;

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    if (isUriSource) {
      setImageError(true);
      setImageLoading(false);
    }
  };

  if (!isUriSource) {
    return <Image source={source} style={style} resizeMode={resizeMode} {...restProps} />;
  }

  return (
    <View style={style}>
      {imageLoading && !imageError && showLoadingIndicator && (
        <View style={[styles.loadingContainer, StyleSheet.absoluteFill]}>
          <ActivityIndicator size={loadingIndicatorSize} color={COLORS.WATCH_NOW_BUTTON} />
        </View>
      )}
      {imageError ? (
        <View style={[styles.placeholderContainer, StyleSheet.absoluteFill]}>
          <Text style={styles.placeholderText}>{placeholderText}</Text>
        </View>
      ) : (
        <Image
          source={source}
          style={style}
          resizeMode={resizeMode}
          onLoad={handleImageLoad}
          onError={handleImageError}
          {...restProps}
        />
      )}
    </View>
  );
};

export default React.memo(SnipsImage);

