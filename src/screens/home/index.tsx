import React, { useCallback, useRef } from 'react';
import { View, Text, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useHomePage } from '@/services/queries/useHomePage';
import { useHomeComponents } from './hooks/useHomeComponents';
import FeaturedCard from '@/screens/Home/components/FeaturedCard';
import CategorySection from '@/screens/Home/components/CategorySection';
import Card from '@/components/Card';
import HorizontalList from '@/components/HorizontalList';
import ExploreMoreCard from '@/components/ExploreMoreCard';
import { styles } from './styles';
import { COLORS, FEATURED_COUNT } from '@/services/constants/common';
import { Title } from '@/services/types/ApiTypes';

const Home: React.FC = () => {
  const { data, isLoading, error } = useHomePage();
  const { featuredList, categoryList, moreList } = useHomeComponents(data);
  const scrollViewRef = useRef<ScrollView>(null);
  const featuredListRef = useRef<FlatList>(null);
  const categoryListRefs = useRef<Map<string, FlatList>>(new Map());

  const renderFeaturedItem = useCallback(
    (title: Title, index: number) => (
      <FeaturedCard title={title} rank={index + 1} showBadges={true} />
    ),
    [],
  );

  const featuredKeyExtractor = useCallback((title: Title) => title.id, []);

  const setCategoryListRef = useCallback((id: string, ref: FlatList | null) => {
    if (ref) {
      categoryListRefs.current.set(id, ref);
    } else {
      categoryListRefs.current.delete(id);
    }
  }, []);

  const resetAllScrolls = useCallback(() => {
    console.log('categoryListRefs count:', categoryListRefs.current.size);
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    featuredListRef.current?.scrollToOffset({ offset: 0, animated: false });
    categoryListRefs.current.forEach((ref: FlatList) => {
      console.log('ref', ref);
      ref?.scrollToOffset({ offset: 0, animated: false });
    });
  }, []);

  useFocusEffect(
    useCallback(() => {


      return () => {
        console.log('useFocusEffect triggered');
        const timeoutId = setTimeout(() => {
          console.log('setTimeout callback - before requestAnimationFrame');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              console.log('calling resetAllScrolls');
              resetAllScrolls();
            });
          });
        }, 100);
        return () => {
          console.log('useFocusEffect cleanup');
          clearTimeout(timeoutId);
        };
      };
    }, [resetAllScrolls]),
  );

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
          ref={scrollViewRef}
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}>
          {featuredList && featuredList.titles && featuredList.titles.length > 0 && (
            <View style={styles.featuredSection}>
              <HorizontalList
                ref={featuredListRef}
                data={featuredList.titles.slice(0, FEATURED_COUNT)}
                renderItem={renderFeaturedItem}
                keyExtractor={featuredKeyExtractor}
              />
            </View>
          )}

          {categoryList.map((component, index) => {
            const sectionId = component.id ? `${component.id}-${index}` : `category-${index}`;
            console.log('Rendering CategorySection - component.id:', component.id, 'index:', index, 'sectionId:', sectionId, 'total categories:', categoryList.length);
            return (
              <CategorySection
                key={sectionId}
                component={component}
                listRef={(ref) => {
                  console.log('listRef callback called for sectionId:', sectionId, 'ref:', ref ? 'valid' : 'null');
                  setCategoryListRef(sectionId, ref);
                }}
              />
            );
          })}

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
