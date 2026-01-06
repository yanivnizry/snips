import type {ReactElement} from 'react';
import type {NativeScrollEvent, NativeSyntheticEvent, LayoutChangeEvent} from 'react-native';
import type { Title } from '@/services/types/ApiTypes';

export interface HorizontalListProps {
  readonly data: readonly Title[];
  readonly renderItem: (item: Title, index: number) => ReactElement;
  readonly keyExtractor: (item: Title, index: number) => string;
  readonly onScrollToEnd?: () => void;
  readonly scrollEnabled?: boolean;
  readonly onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  readonly onContentSizeChange?: (width: number, height: number) => void;
  readonly onLayout?: (event: LayoutChangeEvent) => void;
}
