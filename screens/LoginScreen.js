import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { handleLogin } from '../api';
import { useAuth } from '../context/AuthContext';
import ProfileButton from '../components/ProfileButton';
import Colors from '../constants/Colors';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const onLoginPress = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both email and password");
      return;
    }
  
    try {
      const result = await handleLogin(email, password);
      if (result.success) {
        Alert.alert("Success", "Logged in successfully");
        login(result.data);
      } else {
        Alert.alert("Error", result.error);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong, please try again");
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="pets" size={130} color="black" />
      </View>
      <Text style={styles.title}>Welcome Back!</Text>
      <View style={styles.line}></View>
      <Text style={styles.subtitle}>Log in to see all the dogs up for adoption</Text>
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
        <ProfileButton label="Log In" onPress={onLoginPress} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.switchText}>Don't have an account? <Text style={styles.switchTextBold}>Sign up</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.85,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: Colors.WHITE,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 25,
    color: Colors.BLACK,
    marginBottom: 20,
    textAlign: 'center',
  },
  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.8,
    width: '40%',
    marginTop: 8,
    marginBottom: 10,
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
    backgroundColor: '#ffab00',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  switchText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
  switchTextBold: {
    color: '#ffab00',
    fontWeight: 'bold',
  },
});

export default LoginScreen;