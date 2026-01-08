import React, { useCallback, useMemo } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useHomePage } from '@/services/queries/useHomePage';
import { useHomeComponents } from './hooks/useHomeComponents';
import { useHomeScrollReset } from './hooks/useHomeScrollReset';
import FeaturedCard from '@/screens/Home/components/FeaturedCard';
import HomeListItem from '@/screens/Home/components/HomeListItem';
import { styles } from './styles';
import { COLORS } from '@/constants/common';
import { Title } from '@/services/types/ApiTypes';
import type { HomeListItem as HomeListItemType } from '@/screens/Home/components/HomeListItem/types';

const Home: React.FC = () => {
  const { data, isLoading, error } = useHomePage();
  const { featuredList, categoryList, moreList } = useHomeComponents(data);
  const { flatListRef, featuredListRef, setCategoryListRef } = useHomeScrollReset();

  const renderFeaturedItem = useCallback(
    (title: Title, index: number) => (
      <FeaturedCard title={title} rank={index + 1} showBadges={true} />
    ),
    [],
  );

  const featuredKeyExtractor = useCallback((title: Title) => title.id, []);

  const listData = useMemo<HomeListItemType[]>(() => {
    const items: HomeListItemType[] = [];

    if (featuredList && featuredList.titles && featuredList.titles.length > 0) {
      items.push({ type: 'featured', component: featuredList });
    }

    categoryList.forEach((component, index) => {
      items.push({ type: 'category', component, index });
    });

    if (moreList && moreList.titles && moreList.titles.length > 0) {
      items.push({ type: 'more', component: moreList });
    }

    return items;
  }, [featuredList, categoryList, moreList]);

  const renderItem = useCallback(
    ({ item }: { item: HomeListItemType }) => (
      <HomeListItem
        item={item}
        featuredListRef={featuredListRef}
        renderFeaturedItem={renderFeaturedItem}
        featuredKeyExtractor={featuredKeyExtractor}
        setCategoryListRef={setCategoryListRef}
      />
    ),
    [featuredListRef, renderFeaturedItem, featuredKeyExtractor, setCategoryListRef],
  );

  const keyExtractor = useCallback((item: HomeListItemType, index: number) => {
    switch (item.type) {
      case 'featured':
        return 'featured';
      case 'category':
        return item.component.id
          ? `${item.component.id}-${item.index}`
          : `category-${item.index}`;
      case 'more':
        return 'more';
      default:
        return `item-${index}`;
    }
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView edges={['top']} style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.WATCH_NOW_BUTTON} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView edges={['top']} style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load content. Please try again later.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <LinearGradient
        colors={[COLORS.GRADIENT_START, COLORS.GRADIENT_END]}
        locations={[0, 1]}
        style={styles.gradient}>
        <FlatList
          ref={flatListRef}
          data={listData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;
