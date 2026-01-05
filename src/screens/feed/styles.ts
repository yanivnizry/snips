import {StyleSheet} from 'react-native';
import {COLORS, SPACING} from '@/services/constants/Constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
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
    color: COLORS.PRIMARY_TEXT,
    fontSize: 16,
    textAlign: 'center',
  },
});
