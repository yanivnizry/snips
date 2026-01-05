import {Dimensions} from 'react-native';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

export const FEATURED_COUNT = 5;

export const scaleWidth = (size: number): number => {
  return (size / DESIGN_WIDTH) * DEVICE_WIDTH;
};

export const scaleHeight = (size: number): number => {
  return (size / DESIGN_HEIGHT) * DEVICE_HEIGHT;
};

export const API_BASE_URL =
  process.env.API_BASE_URL || 'https://snips-testing-data.s3.us-east-2.amazonaws.com';

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
} as const;

