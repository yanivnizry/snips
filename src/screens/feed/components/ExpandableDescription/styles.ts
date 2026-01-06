import {StyleSheet} from 'react-native';
import {COLORS, SPACING} from '@/services/constants/common';

export const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.SM,
    position: 'relative',
    paddingRight: 30,
  },
  description: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0,
    color: COLORS.PRIMARY_TEXT,
  },
  toggleButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
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

