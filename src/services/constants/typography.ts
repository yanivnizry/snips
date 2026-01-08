import { Platform } from 'react-native';
import { isIos } from '@/utils/platform';

export const FONT_FAMILY = {
  INTER: Platform.select({
    ios: 'Inter',
    android: 'Inter-Regular',
    default: 'Inter',
  })!,
  INTER_SEMIBOLD: Platform.select({
    ios: 'Inter',
    android: 'Inter-SemiBold',
    default: 'Inter',
  })!,
  POPPINS_SEMIBOLD: Platform.select({
    ios: 'Poppins-SemiBold',
    android: 'Poppins-ExtraBold',
    default: 'Poppins-SemiBold',
  })!,
  POPPINS_EXTRABOLD: Platform.select({
    ios: 'Poppins-ExtraBold',
    android: 'Poppins-ExtraBold',
    default: 'Poppins-ExtraBold',
  })!,
} as const;

export const FONT_WEIGHT = {
  REGULAR: '400',
  MEDIUM: '500',
  SEMIBOLD: '600',
  EXTRABOLD: '800',
} as const;

export const FONT_SIZE = {
  XS: 10,
  SM: 11,
  MD: 14,
  LG: 16,
  XL: 18,
  XXL: 20,
  XXXL: 24,
} as const;

export const LINE_HEIGHT = {
  XS: 11,
  SM: 14,
  MD: 17,
  LG: 20,
  XL: 28,
} as const;

export const TYPOGRAPHY = {
  TAB_BAR_LABEL: {
    fontFamily: FONT_FAMILY.INTER,
    fontSize: FONT_SIZE.XS,
    ...(isIos && { fontWeight: FONT_WEIGHT.MEDIUM }),
  },
  SUBTITLE: {
    fontFamily: FONT_FAMILY.INTER,
    fontSize: FONT_SIZE.SM,
    ...(isIos && { fontWeight: FONT_WEIGHT.REGULAR }),
    lineHeight: LINE_HEIGHT.XS,
  },
  SUBTITLE_XS: {
    fontFamily: FONT_FAMILY.INTER,
    fontSize: 9,
    ...(isIos && { fontWeight: FONT_WEIGHT.REGULAR }),
    lineHeight: LINE_HEIGHT.XS,
  },
  BODY: {
    fontFamily: FONT_FAMILY.INTER,
    fontSize: FONT_SIZE.MD,
    ...(isIos && { fontWeight: FONT_WEIGHT.REGULAR }),
    lineHeight: LINE_HEIGHT.LG,
  },
  BODY_SMALL: {
    fontFamily: FONT_FAMILY.INTER,
    fontSize: FONT_SIZE.MD,
    ...(isIos && { fontWeight: FONT_WEIGHT.REGULAR }),
    lineHeight: LINE_HEIGHT.MD,
  },
  BODY_COMPACT: {
    fontFamily: FONT_FAMILY.INTER,
    fontSize: FONT_SIZE.MD,
    ...(isIos && { fontWeight: FONT_WEIGHT.REGULAR }),
    lineHeight: LINE_HEIGHT.SM,
  },
  BUTTON: {
    fontFamily: Platform.select({
      ios: FONT_FAMILY.INTER,
      android: FONT_FAMILY.INTER_SEMIBOLD,
      default: FONT_FAMILY.INTER,
    })!,
    fontSize: FONT_SIZE.MD,
    ...(isIos && { fontWeight: FONT_WEIGHT.SEMIBOLD }),
  },
  CARD_TITLE: {
    fontFamily: Platform.select({
      ios: FONT_FAMILY.INTER,
      android: FONT_FAMILY.INTER_SEMIBOLD,
      default: FONT_FAMILY.INTER,
    })!,
    fontSize: FONT_SIZE.MD,
    ...(isIos && { fontWeight: FONT_WEIGHT.SEMIBOLD }),
    lineHeight: 18,
  },
  CARD_WATCH_COUNT: {
    fontFamily: FONT_FAMILY.INTER,
    fontSize: FONT_SIZE.SM,
    ...(isIos && { fontWeight: FONT_WEIGHT.REGULAR }),
    lineHeight: LINE_HEIGHT.SM,
  },
  HEADING: {
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE.XXL,
    ...(isIos && { fontWeight: FONT_WEIGHT.SEMIBOLD }),
    lineHeight: LINE_HEIGHT.XL,
  },
  HEADING_INTER: {
    fontFamily: Platform.select({
      ios: FONT_FAMILY.INTER,
      android: FONT_FAMILY.INTER_SEMIBOLD,
      default: FONT_FAMILY.INTER,
    })!,
    fontSize: FONT_SIZE.XXL,
    ...(isIos && { fontWeight: FONT_WEIGHT.SEMIBOLD }),
    lineHeight: LINE_HEIGHT.XL,
  },
  RANK_TEXT: {
    fontFamily: FONT_FAMILY.POPPINS_EXTRABOLD,
    ...(isIos && { fontWeight: FONT_WEIGHT.EXTRABOLD }),
  },
  PLACEHOLDER: {
    fontSize: FONT_SIZE.XL,
    ...(isIos && { fontWeight: FONT_WEIGHT.SEMIBOLD }),
  },
  ERROR_TEXT: {
    fontSize: FONT_SIZE.LG,
  },
} as const;

