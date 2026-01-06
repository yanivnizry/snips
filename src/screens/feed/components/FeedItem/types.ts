import type {FeedItem} from '@/services/types/ApiTypes';

export interface FeedItemProps {
  readonly item: FeedItem;
  readonly scrollHeight: number;
}

