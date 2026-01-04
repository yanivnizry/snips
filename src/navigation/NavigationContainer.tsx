import React from 'react';
import {NavigationContainer as RNNavigationContainer, DarkTheme} from '@react-navigation/native';
import TabNavigator from './TabNavigator';

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#F6245A',
    background: '#0E0E0E',
    card: '#0E0E0E',
    text: '#FEFEFE',
    border: '#0E0E0ECC',
    notification: '#F6245A',
  },
};

const NavigationContainer: React.FC = () => {
  return (
    <RNNavigationContainer theme={navigationTheme}>
      <TabNavigator />
    </RNNavigationContainer>
  );
};

export default NavigationContainer;

