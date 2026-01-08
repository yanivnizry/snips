import {StyleSheet} from 'react-native';
import {COLORS, SPACING} from '@/services/constants/common';
import {EXPLORE_MORE_CARD_CONSTANTS} from './constants';

const CARD_WIDTH = EXPLORE_MORE_CARD_CONSTANTS.WIDTH;
const CARD_HEIGHT = EXPLORE_MORE_CARD_CONSTANTS.HEIGHT;
const CARD_BORDER_RADIUS = EXPLORE_MORE_CARD_CONSTANTS.BORDER_RADIUS;

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

