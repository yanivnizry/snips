import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import HorizontalList from '../../../../components/HorizontalList';
import Card from '../../../../components/Card';
import type {CategorySectionProps} from './types';
import {styles} from './styles';
import {useHorizontalScroll} from '../../hooks/useHorizontalScroll';

const CategorySection: React.FC<CategorySectionProps> = ({component, onScrollToEnd}) => {
  const {listRef, handleScroll, handleContentSizeChange, handleLayout, handleArrowPress} =
    useHorizontalScroll();

  const renderItem = useCallback(
    (title: any, index: number) => <Card title={title} componentType={component.componentType} />,
    [component.componentType],
  );

  const keyExtractor = useCallback((title: any) => title.id, []);

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
      <HorizontalList
        ref={listRef}
        data={component.titles}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScrollToEnd={onScrollToEnd}
        onScroll={handleScroll}
        onContentSizeChange={handleContentSizeChange}
        onLayout={handleLayout}
      />
    </View>
  );
};

export default CategorySection;

