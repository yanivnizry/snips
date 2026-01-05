import type {Component} from '@/services/types/ApiTypes';

export interface CategorySectionProps {
  readonly component: Component;
  readonly onScrollToEnd?: () => void;
}

