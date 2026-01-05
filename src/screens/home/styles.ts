import {StyleSheet} from 'react-native';
import {COLORS, SPACING} from '@/services/constants/Constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    flex: 1,
  },
  featuredSection: {
    paddingHorizontal: SPACING.MD,
    paddingTop: SPACING.MD,
    marginBottom: SPACING.LG,
  },
  categorySection: {
    marginBottom: SPACING.LG,
  },
  gridSection: {
    paddingHorizontal: SPACING.MD,
    marginBottom: SPACING.LG,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 11,
    lineHeight: 11,
    letterSpacing: 0,
    textTransform: 'uppercase',
    color: COLORS.PRIMARY_TEXT,
    marginBottom: SPACING.MD,
    paddingHorizontal: SPACING.MD,
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

