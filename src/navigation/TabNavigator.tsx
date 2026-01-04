import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View, StyleSheet, Text} from 'react-native';
import {useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';
import HomeScreen from '@/screens/home';
import type {RootTabParamList} from './NavigationTypes';
import {COLORS, SPACING} from '@/services/constants/Constants';

const Tab = createBottomTabNavigator<RootTabParamList>();

const PlaceholderScreen: React.FC<{title: string}> = ({title}) => {
  return (
    <SafeAreaView edges={['top']} style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>{title}</Text>
    </SafeAreaView>
  );
};

const TabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.BACKGROUND,
          borderTopColor: COLORS.CARD_BACKGROUND,
          borderTopWidth: 1,
          height: 60 + insets.bottom,
          paddingBottom: SPACING.SM + insets.bottom,
          paddingTop: SPACING.SM,
        },
        tabBarActiveTintColor: COLORS.PRIMARY_TEXT,
        tabBarInactiveTintColor: COLORS.SECONDARY_TEXT,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color}) => (
            <Image
              source={
                focused
                  ? require('@/assets/images/home-fill.png')
                  : require('@/assets/images/home.png')
              }
              style={[styles.icon, {tintColor: color}]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="ForYou"
        options={{
          tabBarLabel: 'For you',
          tabBarIcon: ({focused, color}) => (
            <Image
              source={
                focused
                  ? require('@/assets/images/shorts-fill.png')
                  : require('@/assets/images/shorts.png')
              }
              style={[styles.icon, {tintColor: color}]}
              resizeMode="contain"
            />
          ),
        }}>
        {() => <PlaceholderScreen title="For you" />}
      </Tab.Screen>
      <Tab.Screen
        name="Rewards"
        options={{
          tabBarLabel: 'Rewards',
          tabBarIcon: ({color}) => (
            <Image
              source={require('@/assets/images/gift.png')}
              style={[styles.icon, {tintColor: color}]}
              resizeMode="contain"
            />
          ),
        }}>
        {() => <PlaceholderScreen title="Rewards" />}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Image
              source={require('@/assets/images/user.png')}
              style={[styles.icon, {tintColor: color}]}
              resizeMode="contain"
            />
          ),
        }}>
        {() => <PlaceholderScreen title="Profile" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
  },
  placeholderText: {
    color: COLORS.PRIMARY_TEXT,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TabNavigator;

