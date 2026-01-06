import {StyleSheet} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY, DIMENSIONS, STYLE_CONSTANTS} from '@/services/constants/common';

const CARD_BORDER_RADIUS = DIMENSIONS.CARD.REGULAR.BORDER_RADIUS;
const CARD_WIDTH = DIMENSIONS.CARD.REGULAR.WIDTH;
const CARD_HEIGHT = DIMENSIONS.CARD.REGULAR.HEIGHT;
const CARD_GAP = DIMENSIONS.CARD.REGULAR.GAP;

const IMAGE_WIDTH = DIMENSIONS.CARD.IMAGE.WIDTH;
const IMAGE_HEIGHT = DIMENSIONS.CARD.IMAGE.HEIGHT;
const IMAGE_BORDER_RADIUS = DIMENSIONS.CARD.IMAGE.BORDER_RADIUS;

const GRID_CARD_WIDTH = DIMENSIONS.CARD.GRID.WIDTH;
const GRID_CARD_HEIGHT = DIMENSIONS.CARD.GRID.HEIGHT;
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
    fontSize: STYLE_CONSTANTS.CARD_TITLE_FONT_SIZE,
    lineHeight: STYLE_CONSTANTS.CARD_TITLE_LINE_HEIGHT,
    marginBottom: SPACING.XS,
  },
  subtitle: {
    ...TYPOGRAPHY.CARD_SUBTITLE,
    color: COLORS.SECONDARY_TEXT,
    fontSize: STYLE_CONSTANTS.CARD_SUBTITLE_FONT_SIZE,
  },
  watchContainer: {
    position: 'absolute',
    bottom: CARD_HEIGHT - IMAGE_HEIGHT + STYLE_CONSTANTS.WATCH_CONTAINER_BOTTOM_OFFSET,
    right: STYLE_CONSTANTS.WATCH_CONTAINER_RIGHT_OFFSET,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.OVERLAY_BACKGROUND,
    paddingHorizontal: STYLE_CONSTANTS.WATCH_CONTAINER_PADDING_HORIZONTAL,
    paddingVertical: STYLE_CONSTANTS.WATCH_CONTAINER_PADDING_VERTICAL,
    borderRadius: STYLE_CONSTANTS.WATCH_CONTAINER_BORDER_RADIUS,
  },
  eyeIcon: {
    width: STYLE_CONSTANTS.EYE_ICON_WIDTH,
    height: STYLE_CONSTANTS.EYE_ICON_HEIGHT,
    marginRight: STYLE_CONSTANTS.EYE_ICON_MARGIN_RIGHT,
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
    borderRadius: STYLE_CONSTANTS.GRID_BORDER_RADIUS,
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
    bottom: STYLE_CONSTANTS.WATCH_CONTAINER_BOTTOM_OFFSET,
    right: STYLE_CONSTANTS.WATCH_CONTAINER_RIGHT_OFFSET,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.OVERLAY_BACKGROUND,
    paddingHorizontal: STYLE_CONSTANTS.WATCH_CONTAINER_PADDING_HORIZONTAL,
    paddingVertical: STYLE_CONSTANTS.WATCH_CONTAINER_PADDING_VERTICAL,
    borderRadius: STYLE_CONSTANTS.WATCH_CONTAINER_BORDER_RADIUS,
  },
});

