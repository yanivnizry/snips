import {StyleSheet} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY, scaleWidth, scaleHeight, DIMENSIONS, STYLE_CONSTANTS} from '@/services/constants/common';

const CARD_WIDTH = DIMENSIONS.CARD.FEATURED.WIDTH;
const CARD_HEIGHT = DIMENSIONS.CARD.FEATURED.HEIGHT;
const CORNER_MEDIUM = DIMENSIONS.CARD.FEATURED.BORDER_RADIUS;

export const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CORNER_MEDIUM,
    backgroundColor: COLORS.CARD_BACKGROUND,
    marginRight: DIMENSIONS.CARD.REGULAR.GAP,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.OVERLAY_DARK,
  },
  content: {
    position: 'absolute',
    bottom: STYLE_CONSTANTS.FEATURED_CARD_CONTENT_BOTTOM,
    left: 0,
    right: 0,
    padding: SPACING.MD,
  },
  title: {
    ...TYPOGRAPHY.CARD_TITLE,
    color: COLORS.PRIMARY_TEXT,
    marginBottom: SPACING.XS,
  },
  subtitle: {
    ...TYPOGRAPHY.CARD_SUBTITLE,
    color: COLORS.SECONDARY_TEXT,
  },
  rankOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    overflow: 'visible',
    paddingTop: STYLE_CONSTANTS.RANK_OVERLAY_PADDING_TOP,
    height: STYLE_CONSTANTS.RANK_OVERLAY_HEIGHT,
  },
  rankGradient: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: STYLE_CONSTANTS.RANK_GRADIENT_WIDTH,
    height: STYLE_CONSTANTS.RANK_GRADIENT_HEIGHT,
  },
  rankText: {
    fontFamily: 'Poppins-ExtraBold',
    fontWeight: STYLE_CONSTANTS.RANK_TEXT_FONT_WEIGHT,
    fontSize: STYLE_CONSTANTS.RANK_TEXT_FONT_SIZE,
    lineHeight: STYLE_CONSTANTS.RANK_TEXT_LINE_HEIGHT,
    letterSpacing: 0,
    textAlign: 'right',
    color: COLORS.WHITE,
    includeFontPadding: false,
    textAlignVertical: 'bottom',
    paddingTop: 0,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.XS,
  },
  badge: {
    paddingHorizontal: SPACING.XS,
    paddingVertical: STYLE_CONSTANTS.BADGE_PADDING_VERTICAL,
    backgroundColor: COLORS.WATCH_NOW_BUTTON,
    borderRadius: STYLE_CONSTANTS.BADGE_BORDER_RADIUS,
    marginRight: SPACING.XS,
    marginBottom: SPACING.XS,
  },
  badgeText: {
    ...TYPOGRAPHY.CARD_SUBTITLE,
    color: COLORS.PRIMARY_TEXT,
    fontSize: STYLE_CONSTANTS.BADGE_FONT_SIZE,
  },
  speakerIconContainer: {
    position: 'absolute',
    top: STYLE_CONSTANTS.SPEAKER_ICON_TOP,
    right: STYLE_CONSTANTS.SPEAKER_ICON_RIGHT,
    width: STYLE_CONSTANTS.SPEAKER_ICON_WIDTH,
    height: STYLE_CONSTANTS.SPEAKER_ICON_HEIGHT,
    borderRadius: STYLE_CONSTANTS.SPEAKER_ICON_BORDER_RADIUS,
    backgroundColor: COLORS.OVERLAY_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    gap: STYLE_CONSTANTS.SPEAKER_ICON_GAP,
  },
  speakerIcon: {
    width: STYLE_CONSTANTS.SPEAKER_ICON_IMAGE_WIDTH,
    height: STYLE_CONSTANTS.SPEAKER_ICON_IMAGE_HEIGHT,
    tintColor: COLORS.SECONDARY_TEXT,
  },
});

