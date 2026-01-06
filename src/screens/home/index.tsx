import React, {useCallback} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {useHomePage} from '@/services/queries/useHomePage';
import {useHomeComponents} from './hooks/useHomeComponents';
import FeaturedCard from '@/screens/Home/components/FeaturedCard';
import CategorySection from '@/screens/Home/components/CategorySection';
import Card from '@/components/Card';
import HorizontalList from '@/components/HorizontalList';
import ExploreMoreCard from '@/components/ExploreMoreCard';
import {styles} from './styles';
import {COLORS, FEATURED_COUNT} from '@/services/constants/common';
import { Title } from '@/services/types/ApiTypes';

const Home: React.FC = () => {
  const {data, isLoading, error} = useHomePage();
  const {featuredList, categoryList, moreList} = useHomeComponents(data);

  const renderFeaturedItem = useCallback(
    (title: Title, index: number) => (
      <FeaturedCard title={title} rank={index + 1} showBadges={true} />
    ),
    [],
  );

  const featuredKeyExtractor = useCallback((title: Title) => title.id, []);


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
        colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}
        locations={[0, 1]}
        style={styles.gradient}>
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 40}}>
        {featuredList && featuredList.titles && featuredList.titles.length > 0 && (
          <View style={styles.featuredSection}>
            <HorizontalList
              data={featuredList.titles.slice(0, FEATURED_COUNT)}
              renderItem={renderFeaturedItem}
              keyExtractor={featuredKeyExtractor}
            />
          </View>
        )}

        {categoryList.map(component => (
          <CategorySection key={component.id} component={component} />
        ))}

        {moreList && moreList.titles && moreList.titles.length > 0 && (
          <View style={styles.gridSection}>
            <Text style={styles.sectionTitle}>More to watch</Text>
            <View style={styles.gridContainer}>
              {moreList.titles.map(title => (
                <Card key={title.id} title={title} componentType="MORE_TITLES" />
              ))}
              <ExploreMoreCard />
            </View>
          </View>
        )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;
