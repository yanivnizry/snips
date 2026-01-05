import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY} from '@/services/constants/Constants';

const CARD_BORDER_RADIUS = 8;
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const GRID_PADDING = SPACING.MD * 2;
const GAP = SPACING.MD;
const CARD_WIDTH = (SCREEN_WIDTH - GRID_PADDING - GAP) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.4;

export const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CARD_BORDER_RADIUS,
    backgroundColor: COLORS.CARD_BACKGROUND,
    marginBottom: SPACING.MD,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: CARD_HEIGHT * 0.7,
    resizeMode: 'cover',
  },
  content: {
    padding: SPACING.MD,
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
});

