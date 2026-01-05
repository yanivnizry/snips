import type {Title} from '@/services/types/ApiTypes';

export interface FeaturedCardProps {
  readonly title: Title;
  readonly rank: number;
  readonly showBadges?: boolean;
}

