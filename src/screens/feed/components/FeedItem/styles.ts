import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY, scaleWidth, scaleHeight} from '@/services/constants/Constants';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH;
const CARD_BORDER_RADIUS = 0;
const IMAGE_WIDTH = 393;
const IMAGE_HEIGHT = 764;

export const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: scaleHeight(IMAGE_HEIGHT),
    backgroundColor: COLORS.BACKGROUND,
    overflow: 'hidden',
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  backButton: {
    position: 'absolute',
    top: SPACING.MD,
    left: SPACING.MD,
    zIndex: 10,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 66,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.PRIMARY_TEXT,
  },
  sideIconButton: {
    alignItems: 'center',
    gap: SPACING.XS,
  },
  sideIcon: {
    width: 36,
    height: 36,
    tintColor: COLORS.PRIMARY_TEXT,
  },
    sideIconSmall: {
    width: 24,
    height: 24,
    tintColor: COLORS.PRIMARY_TEXT,
  },
  sideIconText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 14,
    color: COLORS.PRIMARY_TEXT,
    textAlign: 'center',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.MD,
    justifyContent: 'flex-end',
    height: 279,
  },
  contentRow: {
    flexDirection: 'row',
    gap: SPACING.MD,
    alignItems: 'flex-end',
    position: 'relative',
  },
  textContent: {
    flex: 1,
    paddingRight: 80,
  },
  sideIcons: {
    alignItems: 'center',
    gap: SPACING.LG,
    position: 'absolute',
    right: SPACING.MD,
    bottom: 20,
    zIndex: 10,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.2,
    color: COLORS.PRIMARY_TEXT,
    marginTop: SPACING.SM,
  },
  descriptionContainer: {
    marginTop: SPACING.SM,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.MD,
    paddingTop: SPACING.MD,
  },
  watchNowButton: {
    backgroundColor: COLORS.WATCH_NOW_BUTTON,
    width: 301,
    height: 44,
    borderRadius: 16,
    paddingTop: 6,
    paddingRight: 20,
    paddingBottom: 6,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  playIcon: {
    width: 16,
    height: 16,
    tintColor: COLORS.PRIMARY_TEXT,
  },
  watchNowText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 14,
    color: COLORS.PRIMARY_TEXT,
    textAlign: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: {
    fontSize: 24,
    color: COLORS.PRIMARY_TEXT,
  },
  moreIcon: {
    width: 24,
    height: 24,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  moreDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.PRIMARY_TEXT,
  },
});

