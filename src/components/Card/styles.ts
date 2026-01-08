import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@/services/constants/common';
import { TYPOGRAPHY } from '@/services/constants/typography';
import { CARD } from './constants';

const CARD_BORDER_RADIUS = CARD.REGULAR.BORDER_RADIUS;
const CARD_WIDTH = CARD.REGULAR.WIDTH;
const CARD_HEIGHT = CARD.REGULAR.HEIGHT;
const CARD_GAP = CARD.REGULAR.GAP;

const IMAGE_WIDTH = CARD.IMAGE.WIDTH;
const IMAGE_HEIGHT = CARD.IMAGE.HEIGHT;
const IMAGE_BORDER_RADIUS = CARD.IMAGE.BORDER_RADIUS;

const GRID_CARD_WIDTH = CARD.GRID.WIDTH;
const GRID_CARD_HEIGHT = CARD.GRID.HEIGHT;
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
    ...TYPOGRAPHY.CARD_TITLE,
    letterSpacing: 0.01,
    color: COLORS.PRIMARY_TEXT,
    marginBottom: SPACING.XS,
  },
  subtitle: {
    ...TYPOGRAPHY.SUBTITLE_XS,
    letterSpacing: 0,
    textTransform: 'uppercase',
    color: COLORS.SECONDARY_TEXT,
  },
  watchContainer: {
    position: 'absolute',
    bottom: CARD_HEIGHT - IMAGE_HEIGHT + CARD.STYLES.WATCH_CONTAINER_BOTTOM_OFFSET,
    right: CARD.STYLES.WATCH_CONTAINER_RIGHT_OFFSET,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.OVERLAY_BACKGROUND,
    paddingHorizontal: CARD.STYLES.WATCH_CONTAINER_PADDING_HORIZONTAL,
    paddingVertical: CARD.STYLES.WATCH_CONTAINER_PADDING_VERTICAL,
    borderRadius: CARD.STYLES.WATCH_CONTAINER_BORDER_RADIUS,
  },
  eyeIcon: {
    width: CARD.STYLES.EYE_ICON_WIDTH,
    height: CARD.STYLES.EYE_ICON_HEIGHT,
    marginRight: CARD.STYLES.EYE_ICON_MARGIN_RIGHT,
    tintColor: COLORS.PRIMARY_TEXT,
  },
  watchText: {
    ...TYPOGRAPHY.CARD_WATCH_COUNT,
    letterSpacing: 0,
    textAlign: 'center',
    color: COLORS.PRIMARY_TEXT,
  },
  gridCard: {
    width: GRID_CARD_WIDTH,
    height: GRID_CARD_HEIGHT,
    borderRadius: CARD.STYLES.GRID_BORDER_RADIUS,
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
    bottom: CARD.STYLES.WATCH_CONTAINER_BOTTOM_OFFSET,
    right: CARD.STYLES.WATCH_CONTAINER_RIGHT_OFFSET,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.OVERLAY_BACKGROUND,
    paddingHorizontal: CARD.STYLES.WATCH_CONTAINER_PADDING_HORIZONTAL,
    paddingVertical: CARD.STYLES.WATCH_CONTAINER_PADDING_VERTICAL,
    borderRadius: CARD.STYLES.WATCH_CONTAINER_BORDER_RADIUS,
  },
});

