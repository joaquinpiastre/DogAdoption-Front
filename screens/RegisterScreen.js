import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../api';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ProfileButton from '../components/ProfileButton';
import Colors from '../constants/Colors';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

  
    try {
      const response = await registerUser(name, email, password);
      if (response.success) {  // Cambiado para verificar `response.success`
        Alert.alert("Success", response.message);
        navigation.navigate('Login');
      } else {
        Alert.alert("Error", response.error || "Something went wrong, please try again");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong, please try again");
    }
  };
  

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="tooltip-account" size={140} color="black" style={{ alignSelf: 'center', marginBottom: 16 }} />
      <Text style={styles.title}>Register and be part of canine help</Text>
      <View style={styles.line}></View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#FFF"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#FFF"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#FFF"
      />

      <TouchableOpacity>
        <ProfileButton label="Register" onPress={handleRegister} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.switchText}>Already have an account? <Text style={styles.switchTextBold}>Log in</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.85,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginBottom: 10,
    textAlign: 'center',
  },
  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.8,
    width: '40%',
    marginTop: 8,
    marginBottom: 25,
    alignSelf: 'center',
  },
  input: {
    height: 50,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#1c1c1e',
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: Colors.BLACK,
    fontSize: 18,
    textAlign: 'center',
  },
  switchText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
  switchTextBold: {
    color: Colors.PRIMARY,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
