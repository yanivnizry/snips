import {StyleSheet} from 'react-native';
import {COLORS, DIMENSIONS, SPACING} from '@/services/constants/common';
import { scaleWidth, scaleHeight } from '@/services/constants/common';
export const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.SM,
    position: 'relative',
    paddingRight: 30,
  },
  overlay: {
    position: 'absolute',
    bottom: scaleHeight(0),
    left: scaleWidth(-12.5),
    right: 0,
    width: DIMENSIONS.DEVICE.WIDTH,
    zIndex: 0,
    elevation: 2.5,
    pointerEvents: 'none',
  },
  description: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0,
    color: COLORS.PRIMARY_TEXT,
    position: 'relative',
    zIndex: 1,
  },
  toggleButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 2,
  },
  toggleText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.PRIMARY_TEXT,
    textDecorationLine: 'underline',
  },
});

