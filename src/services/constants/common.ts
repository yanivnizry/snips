import { Dimensions } from 'react-native';
import {API_BASE_URL} from '../config/env';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
export const isIPad = DEVICE_WIDTH >= 768;
export const MAX_DESCRIPTION_LENGTH = 175;


export const scaleWidth = (size: number): number => {
  return (size / DESIGN_WIDTH) * DEVICE_WIDTH;
};

export const scaleHeight = (size: number): number => {
  return (size / DESIGN_HEIGHT) * DEVICE_HEIGHT;
};

export const BOTTOM_TAB_BAR_HEIGHT = 60;

export const API_ENDPOINTS = {
  HOME_PAGE: `${API_BASE_URL}/homePage.json`,
  FEED_PAGE: `${API_BASE_URL}/FeedPage1.json`,
};

export const COLORS = {
  BACKGROUND: '#0E0E0E',
  PRIMARY_TEXT: '#FEFEFE',
  SECONDARY_TEXT: '#FFFFFF99',
  WATCH_NOW_BUTTON: '#F6245A',
  CARD_BACKGROUND: '#0E0E0ECC',
  OVERLAY_BACKGROUND: '#0E0E0E33',
  OVERLAY_DARK: '#00000099',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  TRANSPARENT: 'transparent',
  GRADIENT_START: '#00000033',
  GRADIENT_END: '#00000000',
  WHITE_OPACITY_70: '#FFFFFFB3',
  WHITE_OPACITY_50: '#FFFFFF80',
  WHITE_OPACITY_10: '#FFFFFF1A',
};

export const SPACING = {
  BASE: 16,
  XS: 4,
  SM: 8,
  MD: 14,
  LG: 24,
  XL: 32,
  XXL: 48,
};

export const DIMENSIONS = {
  DEVICE: {
    WIDTH: DEVICE_WIDTH,
    HEIGHT: DEVICE_HEIGHT,
  },
  SCREEN: {
    WIDTH: DEVICE_WIDTH,
    HEIGHT: DEVICE_HEIGHT,
  },
};



