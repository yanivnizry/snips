import {StyleSheet} from 'react-native';
import {COLORS, SPACING, DIMENSIONS} from '@/services/constants/common';

const CARD_WIDTH = DIMENSIONS.CARD.EXPLORE_MORE.WIDTH;
const CARD_HEIGHT = DIMENSIONS.CARD.EXPLORE_MORE.HEIGHT;
const CARD_BORDER_RADIUS = DIMENSIONS.CARD.EXPLORE_MORE.BORDER_RADIUS;

export const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CARD_BORDER_RADIUS,
    backgroundColor: COLORS.WHITE_OPACITY_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    gap: SPACING.MD,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: COLORS.WHITE,
  },
  text: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});

