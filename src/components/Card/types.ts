import type {Title, ComponentType} from '@/services/types/ApiTypes';

export interface CardProps {
  readonly title: Title;
  readonly componentType?: ComponentType;
}

