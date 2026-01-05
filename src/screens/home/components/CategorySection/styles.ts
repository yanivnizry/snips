import {StyleSheet} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY} from '@/services/constants/Constants';

export const styles = StyleSheet.create({
  section: {
    marginBottom: SPACING.LG,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.MD,
    marginBottom: SPACING.MD,
  },
  title: {
    ...TYPOGRAPHY.LABEL,
    color: COLORS.PRIMARY_TEXT,
  },
  arrowButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    color: COLORS.PRIMARY_TEXT,
    fontSize: 18,
  },
});

