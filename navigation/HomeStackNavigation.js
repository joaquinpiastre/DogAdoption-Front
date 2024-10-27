import React from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

const HomeStackNavigation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/Adoptame.jpg')}
        style={{
          width: '100%',
          height: 500, 
          borderRadius: 25,
        }}
      />
      <Button
        title="Go to Login" 
        onPress={() => navigation.navigate('Login')}
      />
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFDF6',
    padding: 20,
  },
  Image: {
    width: 20,
    borderRadius: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  listContainer: {
    flex: 1,
    width: '100%',
    maxHeight: '60%',
    backgroundColor: '#DDDDDD',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  flashListContent: {
    paddingVertical: 5,
  },
});

export default HomeStackNavigation;