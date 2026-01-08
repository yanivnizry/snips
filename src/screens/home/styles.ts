import { StyleSheet } from 'react-native';
import { COLORS, SPACING, scaleWidth } from '@/services/constants/common';
import { TYPOGRAPHY } from '@/services/constants/typography';
import { HOME } from './constants';

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
    paddingLeft: HOME.STYLES.GRID_PADDING_LEFT,
    paddingRight: HOME.STYLES.GRID_PADDING_RIGHT,
    marginBottom: SPACING.LG,
    justifyContent: 'flex-start',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: HOME.GRID_CARD.WIDTH * 2 + HOME.GRID_CARD.GAP,
    gap: HOME.GRID_CARD.GAP,
  },
  sectionTitle: {
    ...TYPOGRAPHY.HEADING,
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
    ...TYPOGRAPHY.ERROR_TEXT,
    color: COLORS.PRIMARY_TEXT,
    textAlign: 'center',
  },
  flatListContent: {
    paddingBottom: 40,
  },
});

