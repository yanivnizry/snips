import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { styles } from './styles';
const HomeScreen: React.FC = () => {

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

