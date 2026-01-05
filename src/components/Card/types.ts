import type {Title} from '@/services/types/ApiTypes';

export interface CardProps {
  readonly title: Title;
  readonly size?: 'small' | 'medium' | 'large';
  readonly variant?: 'default' | 'grid';
}

