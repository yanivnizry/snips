import {StyleSheet} from 'react-native';
import {COLORS, SPACING} from '@/constants/common';
import {TYPOGRAPHY} from '@/constants/typography';

export const styles = StyleSheet.create({
  section: {
    marginBottom: SPACING.LG,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: SPACING.MD,
    marginBottom: SPACING.MD,
  },
  title: {
    ...TYPOGRAPHY.HEADING,
    letterSpacing: 0.2,
    color: COLORS.PRIMARY_TEXT,
  },
  arrowButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    width: 8,
    height: 14,
    tintColor: COLORS.PRIMARY_TEXT,
  },
});

