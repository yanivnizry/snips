import {StyleSheet} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY} from '@/services/constants/common';
import {HOME_CONSTANTS} from '../../constants';

const CARD_WIDTH = HOME_CONSTANTS.FEATURED_CARD.WIDTH;
const CARD_HEIGHT = HOME_CONSTANTS.FEATURED_CARD.HEIGHT;
const CORNER_MEDIUM = HOME_CONSTANTS.FEATURED_CARD.BORDER_RADIUS;

export const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CORNER_MEDIUM,
    backgroundColor: COLORS.CARD_BACKGROUND,
    marginRight: HOME_CONSTANTS.REGULAR_CARD.GAP,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
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
    bottom: HOME_CONSTANTS.STYLES.FEATURED_CARD_CONTENT_BOTTOM,
    left: 0,
    right: 0,
    padding: SPACING.MD,
  },
  title: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.01,
    color: COLORS.PRIMARY_TEXT,
    marginBottom: SPACING.XS,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 11,
    letterSpacing: 0,
    textTransform: 'uppercase',
    color: COLORS.SECONDARY_TEXT,
  },
  rankOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    overflow: 'visible',
    paddingTop: HOME_CONSTANTS.STYLES.RANK_OVERLAY_PADDING_TOP,
    height: HOME_CONSTANTS.STYLES.RANK_OVERLAY_HEIGHT,
  },
  rankGradient: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: HOME_CONSTANTS.STYLES.RANK_GRADIENT_WIDTH,
    height: HOME_CONSTANTS.STYLES.RANK_GRADIENT_HEIGHT,
  },
  rankText: {
    fontFamily: 'Poppins-ExtraBold',
    fontWeight: HOME_CONSTANTS.STYLES.RANK_TEXT_FONT_WEIGHT,
    fontSize: HOME_CONSTANTS.STYLES.RANK_TEXT_FONT_SIZE,
    lineHeight: HOME_CONSTANTS.STYLES.RANK_TEXT_LINE_HEIGHT,
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
    paddingVertical: HOME_CONSTANTS.STYLES.BADGE_PADDING_VERTICAL,
    backgroundColor: COLORS.WATCH_NOW_BUTTON,
    borderRadius: HOME_CONSTANTS.STYLES.BADGE_BORDER_RADIUS,
    marginRight: SPACING.XS,
    marginBottom: SPACING.XS,
  },  
  badgeText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 11,
    letterSpacing: 0,
    textTransform: 'uppercase',
    color: COLORS.PRIMARY_TEXT,
    fontSize: HOME_CONSTANTS.STYLES.BADGE_FONT_SIZE,
  },
  speakerIconContainer: {
    position: 'absolute',
    top: HOME_CONSTANTS.STYLES.SPEAKER_ICON_TOP,
    right: HOME_CONSTANTS.STYLES.SPEAKER_ICON_RIGHT,
    width: HOME_CONSTANTS.STYLES.SPEAKER_ICON_WIDTH,
    height: HOME_CONSTANTS.STYLES.SPEAKER_ICON_HEIGHT,
    borderRadius: HOME_CONSTANTS.STYLES.SPEAKER_ICON_BORDER_RADIUS,
    backgroundColor: COLORS.OVERLAY_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    gap: HOME_CONSTANTS.STYLES.SPEAKER_ICON_GAP,
  },
  speakerIcon: {
    width: HOME_CONSTANTS.STYLES.SPEAKER_ICON_IMAGE_WIDTH,
    height: HOME_CONSTANTS.STYLES.SPEAKER_ICON_IMAGE_HEIGHT,
    tintColor: COLORS.SECONDARY_TEXT,
  },
});

