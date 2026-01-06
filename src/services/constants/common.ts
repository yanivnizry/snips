import { Dimensions } from 'react-native';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
export const isIPad = DEVICE_WIDTH >= 768;
export const FEATURED_COUNT = 5;


export const scaleWidth = (size: number): number => {
  return (size / DESIGN_WIDTH) * DEVICE_WIDTH;
};

export const scaleHeight = (size: number): number => {
  return (size / DESIGN_HEIGHT) * DEVICE_HEIGHT;
};

export const BOTTOM_TAB_BAR_HEIGHT = 60;

export const API_BASE_URL = process.env.API_BASE_URL;

export const API_ENDPOINTS = {
  HOME_PAGE: `${API_BASE_URL}/homePage.json`,
  FEED_PAGE: `${API_BASE_URL}/FeedPage1.json`,
} as const;

export const COLORS = {
  BACKGROUND: '#0E0E0E',
  PRIMARY_TEXT: '#FEFEFE',
  SECONDARY_TEXT: '#FFFFFF99',
  WATCH_NOW_BUTTON: '#F6245A',
  CARD_BACKGROUND: '#0E0E0ECC',
  OVERLAY_BACKGROUND: '#0E0E0E33',
  WHITE: '#FFFFFF',
} as const;

export const SPACING = {
  BASE: 16,
  XS: 4,
  SM: 8,
  MD: 14,
  LG: 24,
  XL: 32,
  XXL: 48,
} as const;

export const TYPOGRAPHY = {
  CARD_TITLE: {
    fontFamily: 'Inter',
    fontWeight: '600' as const,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.01,
  },
  CARD_SUBTITLE: {
    fontFamily: 'Inter',
    fontWeight: '400' as const,
    fontSize: 11,
    lineHeight: 11,
    letterSpacing: 0,
    textTransform: 'uppercase' as const,
  },
  LABEL: {
    fontFamily: 'Inter',
    fontWeight: '700' as const,
    fontSize: 11,
    lineHeight: 11,
    letterSpacing: 0,
    textAlign: 'center' as const,
    textTransform: 'uppercase' as const,
  },
} as const;

export const DIMENSIONS = {
  FEED_ITEM: {
    WIDTH: 393,
    HEIGHT: 764,
  },
  DESIGN_BASE: {
    WIDTH: DESIGN_WIDTH,
    HEIGHT: DESIGN_HEIGHT,
  },
  DEVICE: {
    WIDTH: DEVICE_WIDTH,
    HEIGHT: DEVICE_HEIGHT,
  },
  SCREEN: {
    WIDTH: DEVICE_WIDTH,
    HEIGHT: DEVICE_HEIGHT,
  },
  FEED: {
    ASPECT_RATIO: 764 / 393,
    ITEM_HEIGHT: Math.min((DEVICE_WIDTH * 764) / 393, DEVICE_HEIGHT),
    IS_IPAD: DEVICE_WIDTH >= 768,
  },
  CARD: {
    REGULAR: {
      WIDTH: 160,
      HEIGHT: 254,
      BORDER_RADIUS: 8,
      GAP: 8,
    },
    IMAGE: {
      WIDTH: 160,
      HEIGHT: 213,
      BORDER_RADIUS: 12,
    },
    GRID: {
      WIDTH: 177,
      HEIGHT: 236,
      BORDER_RADIUS: 8,
      GAP: 8,
    },
    FEATURED: {
      WIDTH: 235,
      HEIGHT: 352,
      BORDER_RADIUS: 12,
    },
    EXPLORE_MORE: {
      WIDTH: 177,
      HEIGHT: 236,
      BORDER_RADIUS: 8,
    },
    FEED: {
      BORDER_RADIUS: 0,
      CONTENT_BOTTOM_OFFSET: 40,
    },
  },
  SCROLL: {
    ITEMS_TO_SCROLL: 3,
    CARD_WIDTH: 160,
    CARD_GAP: 8,
  },
} as const;

export const SCROLL_CONSTANTS = {
  ITEMS_TO_SCROLL: DIMENSIONS.SCROLL.ITEMS_TO_SCROLL,
  SCROLL_OFFSET: (DIMENSIONS.SCROLL.CARD_WIDTH + DIMENSIONS.SCROLL.CARD_GAP) * DIMENSIONS.SCROLL.ITEMS_TO_SCROLL,
} as const;

