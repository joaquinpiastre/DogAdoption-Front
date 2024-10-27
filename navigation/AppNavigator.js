import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';
import { View, Text } from 'react-native';
import HomeStackNavigation from '../navigation/HomeStackNavigation';
import AuthNavigator from '../navigation/AuthNavigation';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: '#fff',
  },
};

const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Entypo name="home" size={24} color={focused ? '#FFBF00' : '#3F3F3F'} />
              <Text style={{ color: focused ? '#FFBF00' : '#3F3F3F' }}>Home</Text>
            </View>
          ),
        }}
      />
      {/* Agrega AuthNavigator aquí */}
      <Tab.Screen
        name="Auth"
        component={AuthNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Entypo name="login" size={24} color={focused ? '#FFBF00' : '#3F3F3F'} />
              <Text style={{ color: focused ? '#FFBF00' : '#3F3F3F' }}>Auth</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
