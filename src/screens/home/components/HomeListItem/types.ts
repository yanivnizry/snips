import type { FlatList } from 'react-native';
import type { Component, Title } from '@/services/types/ApiTypes';

export type HomeListItem =
  | { type: 'featured'; component: Component }
  | { type: 'category'; component: Component; index: number }
  | { type: 'more'; component: Component };

export interface HomeListItemProps {
  readonly item: HomeListItem;
  readonly featuredListRef: React.RefObject<FlatList>;
  readonly renderFeaturedItem: (title: Title, index: number) => React.ReactElement;
  readonly featuredKeyExtractor: (title: Title) => string;
  readonly setCategoryListRef: (id: string, ref: FlatList | null) => void;
}

