import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Header } from 'react-native/Libraries/NewAppScreen';
import Colors from '../constants/Colors.js';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addDogContainer}>
        <MaterialIcons name="pets" size={24} color="black" />
        <Text style={styles.addDogText}>Add new Dog</Text>
      </View>
      <Button
      title="Go to Register"
      onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addDogContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderColor: Colors.PRIMARY,
    borderRadius: 15,
    borderStyle: "dashed",
    justifyContent: "center",
  },
  addDogText: {
    fontFamily: "outfit-medium",
    color: Colors.PRIMARY,
  },
});

export default HomeScreen;
