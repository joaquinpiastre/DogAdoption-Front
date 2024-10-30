import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getUserProfile, fetchDogs, addDog } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddScreen = () => {
  const [user, setUser] = useState(null);
  const [dogs, setDogs] = useState([]);
  const [newDog, setNewDog] = useState({
    name: '',
    age: '',
    weight: '',
    gender: '',
    breed: '',
    contactNumber: '',
    description: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('@jwt_token');
      const userProfile = await getUserProfile(token);
      const dogList = await fetchDogs();
      setUser(userProfile);
      setDogs(dogList);
    };
    fetchData();
  }, []);

  const handleAddDog = async () => {
    const token = await AsyncStorage.getItem('@jwt_token');
    await addDog(newDog, token);
    setNewDog({ name: '', age: '', weight: '', gender: '', breed: '', contactNumber: '', description: '' });
    const updatedDogs = await fetchDogs();
    setDogs(updatedDogs);
  };

  return (
    <View style={styles.container}>
      {user && <Text style={styles.welcomeText}>Welcome, {user.fullName}!</Text>}
      
      {/* Título del formulario y campos de entrada */}
      <Text style={styles.addDogTitle}>Add your dog</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Dog Name"
          value={newDog.name}
          onChangeText={(text) => setNewDog({ ...newDog, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={newDog.age}
          onChangeText={(text) => setNewDog({ ...newDog, age: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Weight"
          value={newDog.weight}
          onChangeText={(text) => setNewDog({ ...newDog, weight: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={newDog.gender}
          onChangeText={(text) => setNewDog({ ...newDog, gender: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Breed"
          value={newDog.breed}
          onChangeText={(text) => setNewDog({ ...newDog, breed: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={newDog.contactNumber}
          onChangeText={(text) => setNewDog({ ...newDog, contactNumber: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={newDog.description}
          onChangeText={(text) => setNewDog({ ...newDog, description: text })}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleAddDog}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addDogTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 120,
    marginTop: 70,
    alignSelf: 'center',
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#FFBF00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  dogCard: {
    padding: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  dogName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddScreen;
