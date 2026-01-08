import React, { useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import type { SnipsImageProps } from './types';
import { styles } from './styles';
import { COLORS } from '@/services/constants/common';
import { ImageStyle } from 'react-native';

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
    return null;
  }

  return (
    <View style={style}>
      {imageLoading && !imageError && showLoadingIndicator && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={loadingIndicatorSize} color={COLORS.WATCH_NOW_BUTTON} />
        </View>
      )}
      {imageError ? (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>{placeholderText}</Text>
        </View>
      ) : (
        <Image
          source={source}
          style={styles.imageFill}
          resizeMode={resizeMode}
          onLoad={handleImageLoad}
          onError={handleImageError}
          {...restProps}
        />
      )}
    </View>
  );
};

export default React.memo(
  SnipsImage,
  (prevProps, nextProps) => {
    const prevSource = typeof prevProps.source === 'object' && 'uri' in prevProps.source
      ? prevProps.source.uri
      : prevProps.source;
    const nextSource = typeof nextProps.source === 'object' && 'uri' in nextProps.source
      ? nextProps.source.uri
      : nextProps.source;

    return prevSource === nextSource;
  },
);

