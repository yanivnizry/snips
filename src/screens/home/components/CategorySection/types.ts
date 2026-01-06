import type {Component} from '@/services/types/ApiTypes';
import type {FlatList} from 'react-native';

export interface CategorySectionProps {
  readonly component: Component;
  readonly onScrollToEnd?: () => void;
  readonly listRef?: (ref: FlatList | null) => void;
}

