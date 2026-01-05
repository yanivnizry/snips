import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY, scaleWidth, scaleHeight} from '@/services/constants/Constants';

const CARD_BORDER_RADIUS = 8;
const CARD_WIDTH = 177;
const CARD_HEIGHT = 235;
const CARD_GAP = 6;
const IMAGE_HEIGHT = 200;

// Grid variant dimensions
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const GRID_PADDING = SPACING.MD * 2;
const GRID_GAP = SPACING.MD;
const GRID_CARD_WIDTH = (SCREEN_WIDTH - GRID_PADDING - GRID_GAP) / 2;
const GRID_CARD_HEIGHT = GRID_CARD_WIDTH * 1.4;
const GRID_IMAGE_HEIGHT = GRID_CARD_HEIGHT * 0.7;

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
    width: '100%',
    height: IMAGE_HEIGHT,
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 6,
    paddingVertical: 4,
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
    borderRadius: CARD_BORDER_RADIUS,
    backgroundColor: COLORS.CARD_BACKGROUND,
    marginBottom: SPACING.MD,
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
    bottom: GRID_CARD_HEIGHT - GRID_IMAGE_HEIGHT + 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
});

