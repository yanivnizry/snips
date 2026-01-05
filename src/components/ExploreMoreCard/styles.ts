import {StyleSheet} from 'react-native';
import {COLORS, SPACING} from '@/services/constants/Constants';

const CARD_WIDTH = 177;
const CARD_HEIGHT = 236;
const CARD_BORDER_RADIUS = 8;

export const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CARD_BORDER_RADIUS,
    backgroundColor: '#FFFFFF1A',
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

