import type {FeedItem} from '@/services/types/ApiTypes';

export interface FeedItemProps {
  readonly item: FeedItem;
  readonly scrollHeight: number;
  readonly isScrolling?: boolean;
}

export interface FeedItemRef {
  play: () => void;
  pause: () => void;
  isPlaying: () => boolean;
}

