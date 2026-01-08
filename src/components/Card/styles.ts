import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '@/services/constants/common';
import { CARD_CONSTANTS } from './constants';

const CARD_BORDER_RADIUS = CARD_CONSTANTS.REGULAR.BORDER_RADIUS;
const CARD_WIDTH = CARD_CONSTANTS.REGULAR.WIDTH;
const CARD_HEIGHT = CARD_CONSTANTS.REGULAR.HEIGHT;
const CARD_GAP = CARD_CONSTANTS.REGULAR.GAP;

const IMAGE_WIDTH = CARD_CONSTANTS.IMAGE.WIDTH;
const IMAGE_HEIGHT = CARD_CONSTANTS.IMAGE.HEIGHT;
const IMAGE_BORDER_RADIUS = CARD_CONSTANTS.IMAGE.BORDER_RADIUS;

const GRID_CARD_WIDTH = CARD_CONSTANTS.GRID.WIDTH;
const GRID_CARD_HEIGHT = CARD_CONSTANTS.GRID.HEIGHT;
const GRID_IMAGE_HEIGHT = GRID_CARD_HEIGHT;

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
  },
  content: {
    padding: SPACING.SM,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Inter',
    fontWeight: '600',
    letterSpacing: 0.01,
    color: COLORS.PRIMARY_TEXT,
    fontSize: CARD_CONSTANTS.STYLES.TITLE_FONT_SIZE,
    lineHeight: CARD_CONSTANTS.STYLES.TITLE_LINE_HEIGHT,
    marginBottom: SPACING.XS,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 11,
    letterSpacing: 0,
    textTransform: 'uppercase',
    color: COLORS.SECONDARY_TEXT,
    fontSize: CARD_CONSTANTS.STYLES.SUBTITLE_FONT_SIZE,
  },
  watchContainer: {
    position: 'absolute',
    bottom: CARD_HEIGHT - IMAGE_HEIGHT + CARD_CONSTANTS.STYLES.WATCH_CONTAINER_BOTTOM_OFFSET,
    right: CARD_CONSTANTS.STYLES.WATCH_CONTAINER_RIGHT_OFFSET,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.OVERLAY_BACKGROUND,
    paddingHorizontal: CARD_CONSTANTS.STYLES.WATCH_CONTAINER_PADDING_HORIZONTAL,
    paddingVertical: CARD_CONSTANTS.STYLES.WATCH_CONTAINER_PADDING_VERTICAL,
    borderRadius: CARD_CONSTANTS.STYLES.WATCH_CONTAINER_BORDER_RADIUS,
  },
  eyeIcon: {
    width: CARD_CONSTANTS.STYLES.EYE_ICON_WIDTH,
    height: CARD_CONSTANTS.STYLES.EYE_ICON_HEIGHT,
    marginRight: CARD_CONSTANTS.STYLES.EYE_ICON_MARGIN_RIGHT,
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
  gridCard: {
    width: GRID_CARD_WIDTH,
    height: GRID_CARD_HEIGHT,
    borderRadius: CARD_CONSTANTS.STYLES.GRID_BORDER_RADIUS,
    backgroundColor: COLORS.CARD_BACKGROUND,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: GRID_IMAGE_HEIGHT,
  },
  gridContent: {
    padding: SPACING.MD,
    flex: 1,
    justifyContent: 'space-between',
  },
  gridWatchContainer: {
    position: 'absolute',
    bottom: CARD_CONSTANTS.STYLES.WATCH_CONTAINER_BOTTOM_OFFSET,
    right: CARD_CONSTANTS.STYLES.WATCH_CONTAINER_RIGHT_OFFSET,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.OVERLAY_BACKGROUND,
    paddingHorizontal: CARD_CONSTANTS.STYLES.WATCH_CONTAINER_PADDING_HORIZONTAL,
    paddingVertical: CARD_CONSTANTS.STYLES.WATCH_CONTAINER_PADDING_VERTICAL,
    borderRadius: CARD_CONSTANTS.STYLES.WATCH_CONTAINER_BORDER_RADIUS,
  },
});

