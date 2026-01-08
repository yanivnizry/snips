import {StyleSheet} from 'react-native';
import {COLORS, SPACING} from '@/constants/common';
import {TYPOGRAPHY} from '@/constants/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.MD,
  },
  errorText: {
    ...TYPOGRAPHY.ERROR_TEXT,
    color: COLORS.PRIMARY_TEXT,
    textAlign: 'center',
  },
  footerLoader: {
    width: '100%',
    paddingVertical: SPACING.MD,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
