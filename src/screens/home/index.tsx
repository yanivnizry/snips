import React, {useMemo, useCallback} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useHomePage} from '@/services/queries/useHomePage';
import FeaturedCard from '@/screens/Home/components/FeaturedCard';
import CategorySection from '@/screens/Home/components/CategorySection';
import Card from '@/components/Card';
import HorizontalList from '@/components/HorizontalList';
import {styles} from './styles';
import {COLORS} from '@/services/constants/Constants';

const Home: React.FC = () => {
  const {data, isLoading, error} = useHomePage();

  const {featuredComponent, categoryComponents, moreTitlesComponent} = useMemo(() => {
    if (!data?.data?.components) {
      return {
        featuredComponent: null,
        categoryComponents: [],
        moreTitlesComponent: null,
      };
    }

    const components = data.data.components;
    const featured = components.find(c => c.componentType === 'LARGE_COVERS');
    const categories = components.filter(c => c.componentType === 'REGULAR_COVERS');
    const moreTitles = components.find(c => c.componentType === 'MORE_TITLES');

    return {
      featuredComponent: featured || null,
      categoryComponents: categories,
      moreTitlesComponent: moreTitles || null,
    };
  }, [data]);

  const renderFeaturedItem = useCallback(
    (title: any, index: number) => (
      <FeaturedCard title={title} rank={index + 1} showBadges={true} />
    ),
    [],
  );

  const featuredKeyExtractor = useCallback((title: any) => title.id, []);


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
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 40}}>
        {featuredComponent && (
          <View style={styles.featuredSection}>
            <HorizontalList
              data={featuredComponent.titles.slice(0, 5)}
              renderItem={renderFeaturedItem}
              keyExtractor={featuredKeyExtractor}
            />
          </View>
        )}

        {categoryComponents.map(component => (
          <CategorySection key={component.id} component={component} />
        ))}

        {moreTitlesComponent && (
          <View style={styles.gridSection}>
            <Text style={styles.sectionTitle}>More To Watch</Text>
            <View style={styles.gridContainer}>
              {moreTitlesComponent.titles.map(title => (
                <Card key={title.id} title={title} variant="grid" />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
