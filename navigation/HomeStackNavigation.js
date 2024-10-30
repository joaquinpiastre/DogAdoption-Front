import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

const HomeStackNavigation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/AdoptMe.png')}
        style={styles.image}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Auth')}>
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    padding: 20,
  },
  image: {
    width: 350, // Aumenta el ancho de la imagen
    height: 350, // Aumenta la altura de la imagen
    borderRadius: 25,
    marginBottom: 20,
    marginTop: -50, // Mueve la imagen hacia arriba
  },
  button: {
    backgroundColor: '#ffab00',
    borderRadius: 25, 
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, 
    marginTop: 90, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeStackNavigation;