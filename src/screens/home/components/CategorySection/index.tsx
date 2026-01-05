import React, {useRef, useCallback} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import HorizontalList from '../../../../components/HorizontalList';
import Card from '../../../../components/Card';
import type {CategorySectionProps} from './types';
import {styles} from './styles';

const CategorySection: React.FC<CategorySectionProps> = ({component, onScrollToEnd}) => {
  const listRef = useRef<FlatList>(null);

  const handleArrowPress = useCallback(() => {
    if (listRef.current) {
      listRef.current.scrollToEnd({animated: true});
    }
  }, []);

  const renderItem = useCallback(
    (title: any, index: number) => <Card title={title} />,
    [],
  );

  const keyExtractor = useCallback((title: any) => title.id, []);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{component.sectionTitle}</Text>
        <TouchableOpacity style={styles.arrowButton} onPress={handleArrowPress}>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      </View>
      <HorizontalList
        ref={listRef}
        data={component.titles}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScrollToEnd={onScrollToEnd}
      />
    </View>
  );
};

export default CategorySection;

