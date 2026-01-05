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
    paddingLeft: 20,
    paddingRight: SPACING.MD,
    marginBottom: SPACING.MD,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
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

