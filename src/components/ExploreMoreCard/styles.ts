import {StyleSheet} from 'react-native';
import {COLORS, SPACING} from '@/services/constants/common';
import {TYPOGRAPHY} from '@/services/constants/typography';
import {CARD_WIDTH, CARD_HEIGHT, CARD_BORDER_RADIUS} from './constants';

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
    ...TYPOGRAPHY.BODY,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});

