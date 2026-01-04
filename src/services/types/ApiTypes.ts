export interface Badge {
  readonly id: string;
  readonly name: string;
  readonly type: string;
}

export interface Title {
  readonly id: string;
  readonly nameEn: string;
  readonly tags: readonly string[];
  readonly posterUrl: string;
  readonly thumbnailUrl?: string;
  readonly duration: number;
  readonly releaseDate: string;
  readonly genres: readonly string[];
  readonly snipsCount: number;
  readonly badges: readonly Badge[];
  readonly playbackUrl?: string;
  readonly heroCoverUrl?: string;
  readonly videoPlaybackUrl?: string;
  readonly trailerUrl?: string;
}

export type ComponentType =
  | 'LARGE_COVERS'
  | 'REGULAR_COVERS'
  | 'MORE_TITLES';

export interface Component {
  readonly id: string;
  readonly componentType: ComponentType;
  readonly sectionTitle: string;
  readonly titles: readonly Title[];
  readonly link: string;
}

export interface HomePageSettings {
  readonly search: boolean;
}

export interface HomePageData {
  readonly components: readonly Component[];
  readonly settings: HomePageSettings;
  readonly pageType: string;
}

export interface HomePageResponse {
  readonly userUuid: string;
  readonly country: string;
  readonly data: HomePageData;
}

export interface FeedItem {
  readonly id: string;
  readonly name_en: string;
  readonly captions_en: string;
  readonly video_playback_url: string;
  readonly poster_url: string;
  readonly link: string;
  readonly rank: number;
}

export interface FeedPageResponse {
  readonly feedTitles: readonly FeedItem[];
  readonly total: number;
  readonly currentPage: number;
  readonly totalPages: number;
  readonly nextPage: number;
}

