import React from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from './styles';

const ExploreMoreCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/shorts.png')}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.text}>Explore more</Text>
      </View>
    </View>
  );
};

export default ExploreMoreCard;

