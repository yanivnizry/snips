import {StyleSheet} from 'react-native';
import {COLORS, STYLE_CONSTANTS} from '@/services/constants/common';

export const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.CARD_BACKGROUND,
    zIndex: 1,
  },
  placeholderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

