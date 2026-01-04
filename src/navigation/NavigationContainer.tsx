import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NavigationContainer = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Container - To be implemented</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E0E0E',
  },
  text: {
    color: '#FEFEFE',
  },
});

export default NavigationContainer;

