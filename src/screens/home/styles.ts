import {StyleSheet} from 'react-native';
import {COLORS, SPACING, scaleWidth, DIMENSIONS} from '@/services/constants/common';

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
    width: DIMENSIONS.DEVICE.WIDTH - (DIMENSIONS.DEVICE.WIDTH % (DIMENSIONS.CARD.GRID.WIDTH + DIMENSIONS.CARD.GRID.GAP)),
    gap: DIMENSIONS.CARD.GRID.GAP,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.2,
    color: COLORS.PRIMARY_TEXT,
    marginBottom: SPACING.MD,
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

