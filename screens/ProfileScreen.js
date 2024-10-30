import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { updateUserProfile } from '../api'; 
import { useAuth } from '../context/AuthContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ProfileButton from '../components/ProfileButton';
import LogoutButton from '../components/LogoutButton';
import Colors from '../constants/Colors';

const ProfileScreen = () => {
  const { user, logout } = useAuth(); 
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
  
    const updatedData = { name, email };
    if (newPassword) {
      updatedData.password = newPassword;
    }
  
    try {
      const response = await updateUserProfile(updatedData);
      if (response) {
        // Cierra el modal primero
        setModalVisible(false);
        // Navega a AddScreen después de cerrar el modal
        navigation.navigate('Profile');
        Alert.alert("Success", "Profile updated successfully");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => logout() },
      ],
      { cancelable: false }
    )
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="pets" size={160} color="black" style={{ alignSelf: 'center', marginBottom: 16 }} />
      <Text style={styles.title}>Profile Details</Text>
      <View style={styles.line}></View>
      <Text style={styles.readOnlyText}>{name}</Text>
      <Text style={styles.readOnlyText}>{email}</Text>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.resetPasswordText}>reset password</Text>
      </TouchableOpacity>
      
      <LogoutButton onPress={handleLogout} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>reset password</Text>

            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              placeholderTextColor="#888"
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              secureTextEntry
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              placeholderTextColor="#888"
            />
            
            <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
              <ProfileButton label="Guardar" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <ProfileButton label="Cancelar" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: Colors.WHITE ,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginBottom: 10,
    textAlign: 'center',
  },
  resetPasswordText: {
    color: '#ffab00',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
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
  readOnlyText: {
    height: 50,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#1c1c1e',
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '85%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 25,
    marginBottom: 15,
  },
  button: {
    width: '90%', // Ajusta el ancho del botón
    alignSelf: 'center', // Centra el botón horizontalmente
  },
});

export default ProfileScreen;
