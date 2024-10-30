import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';
import { View, Text } from 'react-native';
import AuthNavigator from '../navigation/AuthNavigation';
import AddScreen from '../screens/AddScreen';
import PrincipalScreen from '../screens/PrincipalScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useAuth } from '../context/AuthContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import HomeStackNavigation from './HomeStackNavigation';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Tab.Navigator screenOptions={{
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        paddingBottom: 5,
        backgroundColor: '#fff',
      },
    }}>
      {!isAuthenticated ? (
        <>
          <Tab.Screen
            name="Home"
            component={HomeStackNavigation}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <AntDesign name="home" size={24} color="black" />
                  <Text style={{ color: focused ? '#FFBF00' : '#3F3F3F' }}>Home</Text>
                </View>
              ),
            }}
          />
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
        </>
      ) : (
        <>
          <Tab.Screen
            name="Principal"
            component={PrincipalScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <AntDesign name="home" size={24} color="black" />
                  <Text style={{ color: focused ? '#FFBF00' : '#3F3F3F' }}>Home</Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Add"
            component={AddScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <AntDesign name="heart" size={24} color="black" />
                  <Text style={{ color: focused ? '#FFBF00' : '#3F3F3F' }}>Add</Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Entypo name="user" size={24} color={focused ? '#FFBF00' : '#3F3F3F'} />
                  <Text style={{ color: focused ? '#FFBF00' : '#3F3F3F' }}>Profile</Text>
                </View>
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default AppNavigator;
