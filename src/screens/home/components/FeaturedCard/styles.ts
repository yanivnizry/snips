import {StyleSheet} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY, scaleWidth, scaleHeight} from '@/services/constants/Constants';

const CARD_WIDTH = 235;
const CARD_HEIGHT = 352;
const CORNER_MEDIUM = 12;

export const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CORNER_MEDIUM,
    backgroundColor: COLORS.CARD_BACKGROUND,
    marginRight: SPACING.MD,
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    position: 'absolute',
    bottom: -10 ,
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
    bottom: -20,
    right: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  rankGradient: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: 146.47,
    height: 129.24,
  },
  rankText: {
    fontFamily: 'Poppins',
    fontWeight: '800',
    fontSize: 146.47,
    lineHeight: 146.47,
    letterSpacing: 0,
    textAlign: 'right',
    color: 'white',
    includeFontPadding: false,
    textAlignVertical: 'bottom',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.XS,
  },
  badge: {
    paddingHorizontal: SPACING.XS,
    paddingVertical: 2,
    backgroundColor: COLORS.WATCH_NOW_BUTTON,
    borderRadius: 4,
    marginRight: SPACING.XS,
    marginBottom: SPACING.XS,
  },
  badgeText: {
    ...TYPOGRAPHY.CARD_SUBTITLE,
    color: COLORS.PRIMARY_TEXT,
    fontSize: 9,
  },
  speakerIconContainer: {
    position: 'absolute',
    top: 7,
    right: 7,
  },
  speakerIcon: {
    width: 17,
    height: 17,
    tintColor: COLORS.SECONDARY_TEXT,
  },
});

