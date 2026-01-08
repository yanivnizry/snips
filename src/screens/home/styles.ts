import { StyleSheet } from 'react-native';
import { COLORS, SPACING, scaleWidth } from '@/services/constants/common';
import { HOME_CONSTANTS } from './constants';

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
    paddingLeft: HOME_CONSTANTS.STYLES.GRID_PADDING_LEFT,
    paddingRight: HOME_CONSTANTS.STYLES.GRID_PADDING_RIGHT,
    marginBottom: SPACING.LG,
    justifyContent: 'flex-start',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: HOME_CONSTANTS.GRID_CARD.WIDTH * 2 + HOME_CONSTANTS.GRID_CARD.GAP,
    gap: HOME_CONSTANTS.GRID_CARD.GAP,
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
  flatListContent: {
    paddingBottom: 40,
  },
});

