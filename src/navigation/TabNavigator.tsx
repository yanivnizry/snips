import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text } from 'react-native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import Home from '@/screens/Home';
import Feed from '@/screens/Feed';
import type { RootTabParamList } from './NavigationTypes';
import { COLORS, SPACING } from '@/services/constants/common';
import { TYPOGRAPHY } from '@/services/constants/typography';
import styles from './styles';

const Tab = createBottomTabNavigator<RootTabParamList>();

const PlaceholderScreen: React.FC<{ title: string }> = ({ title }) => {
  return (
    <SafeAreaView edges={['top']} style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>{title}</Text>
    </SafeAreaView>
  );
};

const getIconStyle = (color: string) => [styles.icon, { tintColor: color }];

const HomeIcon: React.FC<{ focused: boolean; color: string }> = ({ focused, color }) => (
  <Image
    source={
      focused
        ? require('@/assets/images/home-fill.png')
        : require('@/assets/images/home.png')
    }
    style={getIconStyle(color)}
    resizeMode="contain"
  />
);

const ForYouIcon: React.FC<{ focused: boolean; color: string }> = ({ focused, color }) => (
  <Image
    source={
      focused
        ? require('@/assets/images/shorts-fill.png')
        : require('@/assets/images/shorts.png')
    }
    style={getIconStyle(color)}
    resizeMode="contain"
  />
);

const RewardsIcon: React.FC<{ color: string }> = ({ color }) => (
  <Image
    source={require('@/assets/images/gift.png')}
    style={getIconStyle(color)}
    resizeMode="contain"
  />
);

const ProfileIcon: React.FC<{ color: string }> = ({ color }) => (
  <Image
    source={require('@/assets/images/user.png')}
    style={getIconStyle(color)}
    resizeMode="contain"
  />
);

const RewardsScreen: React.FC = () => <PlaceholderScreen title="Rewards" />;
const ProfileScreen: React.FC = () => <PlaceholderScreen title="Profile" />;

const renderHomeIcon = ({ focused, color }: { focused: boolean; color: string }) => (
  <HomeIcon focused={focused} color={color} />
);

const renderForYouIcon = ({ focused, color }: { focused: boolean; color: string }) => (
  <ForYouIcon focused={focused} color={color} />
);

const renderRewardsIcon = ({ color }: { color: string }) => <RewardsIcon color={color} />;

const renderProfileIcon = ({ color }: { color: string }) => <ProfileIcon color={color} />;

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
          ...TYPOGRAPHY.TAB_BAR_LABEL,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: renderHomeIcon,
        }}
      />
      <Tab.Screen
        name="ForYou"
        component={Feed}
        options={{
          tabBarLabel: 'For you',
          lazy: false,
          tabBarIcon: renderForYouIcon,
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          tabBarLabel: 'Rewards',
          tabBarIcon: renderRewardsIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: renderProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

