import {StyleSheet} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY, scaleWidth, scaleHeight, DIMENSIONS} from '@/services/constants/common';

const SCREEN_WIDTH = DIMENSIONS.SCREEN.WIDTH;
const SCREEN_HEIGHT = DIMENSIONS.SCREEN.HEIGHT;
const CARD_WIDTH = SCREEN_WIDTH;
const CARD_BORDER_RADIUS = DIMENSIONS.CARD.FEED.BORDER_RADIUS;

const CARD_HEIGHT = DIMENSIONS.FEED.ITEM_HEIGHT;
const CONTENT_BOTTOM_OFFSET = scaleHeight(DIMENSIONS.CARD.FEED.CONTENT_BOTTOM_OFFSET);

export const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: COLORS.BACKGROUND,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    elevation: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 2,
    elevation: 2,
  },
  backButton: {
    position: 'absolute',
    top: scaleHeight(66),
    left: SPACING.MD,
    zIndex: 10,
    elevation: 10,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
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
    bottom: CONTENT_BOTTOM_OFFSET,
    left: 0,
    right: 0,
    padding: SPACING.MD,
    paddingBottom: SPACING.MD + 10,
    justifyContent: 'flex-end',
    height: scaleHeight(279),
    zIndex: 3,
    elevation: 3,
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  contentRow: {
    flexDirection: 'row',
    gap: SPACING.MD,
    alignItems: 'flex-end',
    position: 'relative',
  },
  textContent: {
    flex: 1,
    paddingRight: scaleWidth(80),
  },
  sideIcons: {
    alignItems: 'center',
    gap: SPACING.LG,
    position: 'absolute',
    right: SPACING.MD,
    bottom: CONTENT_BOTTOM_OFFSET + scaleHeight(20),
    zIndex: 10,
    elevation: 10,
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
    zIndex: 4,
    elevation: 4,
    position: 'relative',
  },
  watchNowButton: {
    backgroundColor: COLORS.WATCH_NOW_BUTTON,
    width: scaleWidth(301),
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
    maxWidth: 301,
    zIndex: 5,
    elevation: 5,
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

