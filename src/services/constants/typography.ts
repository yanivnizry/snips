export const FONT_FAMILY = {
  INTER: 'Inter',
  POPPINS_SEMIBOLD: 'Poppins-SemiBold',
  POPPINS_EXTRABOLD: 'Poppins-ExtraBold',
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
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
  SUBTITLE: {
    fontFamily: FONT_FAMILY.INTER,
    fontSize: FONT_SIZE.SM,
    fontWeight: FONT_WEIGHT.REGULAR,
    lineHeight: LINE_HEIGHT.XS,
  },
  SUBTITLE_XS: {
    fontFamily: FONT_FAMILY.INTER,
    fontSize: 9,
    fontWeight: FONT_WEIGHT.REGULAR,
    lineHeight: LINE_HEIGHT.XS,
  },
  BODY: {
    fontFamily: FONT_FAMILY.INTER,
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.REGULAR,
    lineHeight: LINE_HEIGHT.LG,
  },
  BODY_SMALL: {
    fontFamily: FONT_FAMILY.INTER,
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.REGULAR,
    lineHeight: LINE_HEIGHT.MD,
  },
  BODY_COMPACT: {
    fontFamily: FONT_FAMILY.INTER,
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.REGULAR,
    lineHeight: LINE_HEIGHT.SM,
  },
  BUTTON: {
    fontFamily: FONT_FAMILY.INTER,
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
  },
  CARD_TITLE: {
    fontFamily: FONT_FAMILY.INTER,
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    lineHeight: 18,
  },
  CARD_WATCH_COUNT: {
    fontFamily: FONT_FAMILY.INTER,
    fontSize: FONT_SIZE.SM,
    fontWeight: FONT_WEIGHT.REGULAR,
    lineHeight: LINE_HEIGHT.SM,
  },
  HEADING: {
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE.XXL,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    lineHeight: LINE_HEIGHT.XL,
  },
  HEADING_INTER: {
    fontFamily: FONT_FAMILY.INTER,
    fontSize: FONT_SIZE.XXL,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    lineHeight: LINE_HEIGHT.XL,
  },
  RANK_TEXT: {
    fontFamily: FONT_FAMILY.POPPINS_EXTRABOLD,
    fontWeight: FONT_WEIGHT.EXTRABOLD,
  },
  PLACEHOLDER: {
    fontSize: FONT_SIZE.XL,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
  },
  ERROR_TEXT: {
    fontSize: FONT_SIZE.LG,
  },
} as const;

