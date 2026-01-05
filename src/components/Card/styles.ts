import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY, scaleWidth, scaleHeight} from '@/services/constants/Constants';

const CARD_BORDER_RADIUS = 8;
const CARD_WIDTH = 160;
const CARD_HEIGHT = 254;
const CARD_GAP = 8;
const IMAGE_WIDTH = 160;
const IMAGE_HEIGHT = 213;
const IMAGE_BORDER_RADIUS = 12;

// Grid variant dimensions
// Total width: 362px (2 columns + 8px gap)
// Each column: (362 - 8) / 2 = 177px
const GRID_CARD_WIDTH = 177;
const GRID_CARD_HEIGHT = 236;
const GRID_IMAGE_HEIGHT = GRID_CARD_HEIGHT;
const GRID_GAP = 8;

export const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CARD_BORDER_RADIUS,
    backgroundColor: COLORS.CARD_BACKGROUND,
    marginRight: CARD_GAP,
    overflow: 'hidden',
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: IMAGE_BORDER_RADIUS,
    resizeMode: 'cover',
  },
  content: {
    padding: SPACING.SM,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    ...TYPOGRAPHY.CARD_TITLE,
    color: COLORS.PRIMARY_TEXT,
    fontSize: 14,
    lineHeight: 18,
    marginBottom: SPACING.XS,
  },
  subtitle: {
    ...TYPOGRAPHY.CARD_SUBTITLE,
    color: COLORS.SECONDARY_TEXT,
    fontSize: 9,
  },
  watchContainer: {
    position: 'absolute',
    bottom: CARD_HEIGHT - IMAGE_HEIGHT + 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.OVERLAY_BACKGROUND,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 16,
  },
  eyeIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
    tintColor: COLORS.PRIMARY_TEXT,
  },
  watchText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0,
    textAlign: 'center',
    color: COLORS.PRIMARY_TEXT,
  },
  // Grid variant styles
  gridCard: {
    width: GRID_CARD_WIDTH,
    height: GRID_CARD_HEIGHT,
    borderRadius: 8,
    backgroundColor: COLORS.CARD_BACKGROUND,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: GRID_IMAGE_HEIGHT,
    resizeMode: 'cover',
  },
  gridContent: {
    padding: SPACING.MD,
    flex: 1,
    justifyContent: 'space-between',
  },
  gridWatchContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.OVERLAY_BACKGROUND,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 16,
  },
});

