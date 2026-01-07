import {StyleSheet} from 'react-native';
import {COLORS, STYLE_CONSTANTS} from '@/services/constants/common';

export const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.CARD_BACKGROUND,
    zIndex: 1,
  },
  placeholderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.CARD_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.SECONDARY_TEXT,
    fontSize: STYLE_CONSTANTS.CARD_SUBTITLE_FONT_SIZE,
    fontFamily: 'Inter',
  },
  imageFill: {
    ...StyleSheet.absoluteFillObject,
  },
});

