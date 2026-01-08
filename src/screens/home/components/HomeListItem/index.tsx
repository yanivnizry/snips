import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import HorizontalList from '@/components/HorizontalList';
import CategorySection from '@/screens/Home/components/CategorySection';
import Card from '@/components/Card';
import ExploreMoreCard from '@/components/ExploreMoreCard';
import { styles } from '../../styles';
import { HOME_CONSTANTS } from '../../constants';
import type { HomeListItemProps } from './types';

const HomeListItem: React.FC<HomeListItemProps> = ({
  item,
  featuredListRef,
  renderFeaturedItem,
  featuredKeyExtractor,
  setCategoryListRef,
}) => {
  switch (item.type) {
    case 'featured':
      return (
        <View style={styles.featuredSection}>
          <HorizontalList
            ref={featuredListRef}
            data={item.component.titles.slice(0, HOME_CONSTANTS.FEATURED_COUNT)}
            renderItem={renderFeaturedItem}
            keyExtractor={featuredKeyExtractor}
            itemWidth={HOME_CONSTANTS.FEATURED_CARD.WIDTH + HOME_CONSTANTS.REGULAR_CARD.GAP}
          />
        </View>
      );

    case 'category':
      const sectionId = item.component.id
        ? `${item.component.id}-${item.index}`
        : `category-${item.index}`;
      return (
        <CategorySection
          component={item.component}
          listRef={(ref) => setCategoryListRef(sectionId, ref)}
        />
      );

    case 'more':
      return (
        <View style={styles.gridSection}>
          <Text style={styles.sectionTitle}>More to watch</Text>
          <View style={styles.gridContainer}>
            {item.component.titles.map((title) => (
              <Card key={title.id} title={title} componentType="MORE_TITLES" />
            ))}
            <ExploreMoreCard />
          </View>
        </View>
      );

    default:
      return null;
  }
};

export default React.memo(HomeListItem, (prevProps, nextProps) => prevProps.item.type === nextProps.item.type && prevProps.item.component.id === nextProps.item.component.id);

