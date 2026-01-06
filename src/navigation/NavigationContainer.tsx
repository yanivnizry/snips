import React from 'react';
import {NavigationContainer as RNNavigationContainer, DarkTheme} from '@react-navigation/native';
import TabNavigator from './TabNavigator';

const NavigationContainer: React.FC = () => {
  return (
    <RNNavigationContainer>
      <TabNavigator />
    </RNNavigationContainer>
  );
};

export default NavigationContainer;

