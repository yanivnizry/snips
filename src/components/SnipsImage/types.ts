import type {ImageStyle, StyleProp} from 'react-native';
import type {ImageSourcePropType, ImageProps} from 'react-native';

export interface SnipsImageProps extends Omit<ImageProps, 'source' | 'style'> {
  readonly source: ImageSourcePropType | {uri: string};
  readonly style?: StyleProp<ImageStyle>;
  readonly placeholderText?: string;
  readonly loadingIndicatorSize?: 'small' | 'large';
  readonly showLoadingIndicator?: boolean;
}

