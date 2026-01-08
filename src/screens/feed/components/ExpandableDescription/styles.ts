import {StyleSheet} from 'react-native';
import {COLORS, DIMENSIONS, SPACING} from '@/constants/common';
import {TYPOGRAPHY} from '@/constants/typography';
import { scaleWidth } from '@/constants/common';
import { isAndroid } from '@/utils/platform';
export const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.SM,
    position: 'relative',
    paddingRight: 30,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: isAndroid ? scaleWidth(-15) : scaleWidth(-12.5),
    right: 0,
    width: DIMENSIONS.DEVICE.WIDTH,
    zIndex: 0,
    elevation: 2.5,
    pointerEvents: 'none',
  },
  overlayWithHeight: {
    bottom: -100,
  },
  description: {
    ...TYPOGRAPHY.BODY_SMALL,
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
    ...TYPOGRAPHY.BODY,
    color: COLORS.PRIMARY_TEXT,
    textDecorationLine: 'underline',
  },
});

