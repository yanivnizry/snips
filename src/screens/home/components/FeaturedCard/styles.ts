import {StyleSheet} from 'react-native';
import {COLORS, SPACING} from '@/constants/common';
import {TYPOGRAPHY} from '@/constants/typography';
import {isAndroid} from '@/utils/platform';
import {HOME} from '../../constants';

const CARD_WIDTH = HOME.FEATURED_CARD.WIDTH;
const CARD_HEIGHT = HOME.FEATURED_CARD.HEIGHT;
const CORNER_MEDIUM = HOME.FEATURED_CARD.BORDER_RADIUS;

export const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CORNER_MEDIUM,
    backgroundColor: COLORS.CARD_BACKGROUND,
    marginRight: HOME.REGULAR_CARD.GAP,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    zIndex: 1,
  },
  content: {
    position: 'absolute',
    bottom: HOME.STYLES.FEATURED_CARD_CONTENT_BOTTOM,
    left: 0,
    right: 0,
    padding: SPACING.MD,
    zIndex: 2,
  },
  title: {
    ...TYPOGRAPHY.HEADING_INTER,
    letterSpacing: 0.01,
    color: COLORS.PRIMARY_TEXT,
    marginBottom: SPACING.XS,
  },
  subtitle: {
    ...TYPOGRAPHY.SUBTITLE,
    letterSpacing: 0,
    textTransform: 'uppercase',
    color: COLORS.SECONDARY_TEXT,
  },
  rankOverlay: {
    position: 'absolute',
    bottom: isAndroid ? -40 : 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    overflow: 'visible',
    paddingTop: HOME.STYLES.RANK_OVERLAY_PADDING_TOP,
    height: HOME.STYLES.RANK_OVERLAY_HEIGHT,
  },
  rankGradient: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: HOME.STYLES.RANK_GRADIENT_WIDTH,
    height: HOME.STYLES.RANK_GRADIENT_HEIGHT,
  },
  rankText: {
    ...TYPOGRAPHY.RANK_TEXT,
    fontSize: HOME.STYLES.RANK_TEXT_FONT_SIZE,
    lineHeight: HOME.STYLES.RANK_TEXT_LINE_HEIGHT,
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
    paddingVertical: HOME.STYLES.BADGE_PADDING_VERTICAL,
    backgroundColor: COLORS.WATCH_NOW_BUTTON,
    borderRadius: HOME.STYLES.BADGE_BORDER_RADIUS,
    marginRight: SPACING.XS,
    marginBottom: SPACING.XS,
  },  
  badgeText: {
    ...TYPOGRAPHY.SUBTITLE_XS,
    letterSpacing: 0,
    textTransform: 'uppercase',
    color: COLORS.PRIMARY_TEXT,
  },
  speakerIconContainer: {
    position: 'absolute',
    top: HOME.STYLES.SPEAKER_ICON_TOP,
    right: HOME.STYLES.SPEAKER_ICON_RIGHT,
    width: HOME.STYLES.SPEAKER_ICON_WIDTH,
    height: HOME.STYLES.SPEAKER_ICON_HEIGHT,
    borderRadius: HOME.STYLES.SPEAKER_ICON_BORDER_RADIUS,
    backgroundColor: COLORS.OVERLAY_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    gap: HOME.STYLES.SPEAKER_ICON_GAP,
  },
  speakerIcon: {
    width: HOME.STYLES.SPEAKER_ICON_IMAGE_WIDTH,
    height: HOME.STYLES.SPEAKER_ICON_IMAGE_HEIGHT,
    tintColor: COLORS.SECONDARY_TEXT,
  },
});

