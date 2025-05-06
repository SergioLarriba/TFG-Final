import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import theme from '@/constants/Theme';
import {
  HomeIcon,
  HomeIconOutline,
  ProductIcon,
  ProductIconOutline,
  ReceipIcon,
  ReceipIconOutline,
  RestaurantIcon,
  RestaurantIconOutline,
  RobotIcon,
  RobotIconOutline
} from '@/components/Styled/Icons';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: theme.colors.grey,
        tabBarActiveTintColor: theme.colors.green,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        headerTintColor: theme.colors.white,
      }}>
      <Tabs.Screen
        name='Restaurants'
        options={{
          headerTitle: t('Tabs.restaurants'),
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {focused
                ? <RestaurantIcon color={theme.colors.green} />
                : <RestaurantIconOutline color={theme.colors.white} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='Assistant'
        options={{
          headerTitle: t('Tabs.assistant'),
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {focused
                ? <RobotIcon color={theme.colors.green} />
                : <RobotIconOutline color={theme.colors.white} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='Home'
        options={{
          headerTitle: 'Home',
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {focused
                ? <HomeIcon color={theme.colors.green} />
                : <HomeIconOutline color={theme.colors.white} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='Products'
        options={{
          headerTitle: t('Tabs.products'),
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {focused
                ? <ProductIcon color={theme.colors.green} />
                : <ProductIconOutline color={theme.colors.white} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='Recipes'
        options={{
          headerTitle: t('Tabs.recipes'),
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {focused
                ? <ReceipIcon color={theme.colors.green} />
                : <ReceipIconOutline color={theme.colors.white} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.primary,
    height: 60,
    paddingTop: 10,
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
