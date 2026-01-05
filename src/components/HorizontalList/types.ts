import type {ReactElement} from 'react';

export interface HorizontalListProps {
  readonly data: readonly any[];
  readonly renderItem: (item: any, index: number) => ReactElement;
  readonly keyExtractor: (item: any, index: number) => string;
  readonly onScrollToEnd?: () => void;
  readonly scrollEnabled?: boolean;
}
