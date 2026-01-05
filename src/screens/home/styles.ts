import {StyleSheet} from 'react-native';
import {COLORS, SPACING, scaleWidth} from '@/services/constants/Constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  featuredSection: {
    paddingTop: SPACING.MD,
    marginBottom: SPACING.LG,
  },
  categorySection: {
    marginBottom: SPACING.LG,
  },
  gridSection: {
    paddingLeft: 20,
    paddingRight: SPACING.MD,
    marginBottom: SPACING.LG,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: 362,
    gap: 8,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.2,
    color: COLORS.PRIMARY_TEXT,
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

