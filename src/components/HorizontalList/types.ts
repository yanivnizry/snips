import type {ReactElement} from 'react';
import type {NativeScrollEvent, NativeSyntheticEvent, LayoutChangeEvent} from 'react-native';

export interface HorizontalListProps {
  readonly data: readonly any[];
  readonly renderItem: (item: any, index: number) => ReactElement;
  readonly keyExtractor: (item: any, index: number) => string;
  readonly onScrollToEnd?: () => void;
  readonly scrollEnabled?: boolean;
  readonly onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  readonly onContentSizeChange?: (width: number, height: number) => void;
  readonly onLayout?: (event: LayoutChangeEvent) => void;
}
