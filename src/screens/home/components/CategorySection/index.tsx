import React, {useCallback, useMemo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import HorizontalList from '../../../../components/HorizontalList';
import Card from '../../../../components/Card';
import type {CategorySectionProps} from './types';
import {styles} from './styles';
import {useHorizontalScroll} from '../../hooks/useHorizontalScroll';
import { Title } from '@/services/types/ApiTypes';
import {DIMENSIONS} from '@/services/constants/common';

const CategorySection: React.FC<CategorySectionProps> = ({component, onScrollToEnd, listRef: externalListRef}) => {
  const {listRef, handleScroll, handleContentSizeChange, handleLayout, handleArrowPress} =
    useHorizontalScroll({ externalRefCallback: externalListRef });

  const renderItem = useCallback(
    (title: Title, index: number) => <Card title={title} componentType={component.componentType} />,
    [component.componentType],
  );

  const keyExtractor = useCallback((title: Title) => title.id, []);

  const itemWidth = useMemo(() => {
    return DIMENSIONS.CARD.REGULAR.WIDTH + DIMENSIONS.CARD.REGULAR.GAP;
  }, []);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{component.sectionTitle}</Text>
        <TouchableOpacity style={styles.arrowButton} onPress={handleArrowPress}>
          <Image
            source={require('@/assets/images/arrow.png')}
            style={styles.arrowIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {component.titles && component.titles.length > 0 && (
        <HorizontalList
          ref={listRef}
          data={component.titles}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          itemWidth={itemWidth}
          onScrollToEnd={onScrollToEnd}
          onScroll={handleScroll}
          onContentSizeChange={handleContentSizeChange}
          onLayout={handleLayout}
        />
      )}
    </View>
  );
};

export default CategorySection;

