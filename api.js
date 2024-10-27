import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//PARA CASA
//'http://192.168.18.13:8080/'
//PARA FACULTAD
//'http://10.51.3.194:8080/'


// URL base del servidor
const API_AUTH_BASE_URL = 'http://192.168.0.101:8080/auth';
const API_USER_BASE_URL = 'http://192.168.0.101:8080/users';


// Función para manejar el inicio de sesión
export const handleLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_AUTH_BASE_URL}/login`, {
      email,
      password,
    });

    if (response.status === 200) {
      const token = response.data.token;
      await AsyncStorage.setItem('@jwt_token', token);

      const userResponse = await getUserProfile(token);
      return { success: true, data: userResponse.data };
    } else {
      return { success: false, error: 'Invalid response status' };
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { success: false, error: 'Invalid credentials' };
    } else {
      return { success: false, error: error.message };
    }
  }
};

// Función para manejar el registro
export const handleRegister = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_AUTH_BASE_URL}/register`, {
      username,
      email,
      password,
    });

    if (response.status === 200) {
      return { success: true, message: 'User registered successfully' };
    } else {
      return { success: false, error: 'Registration failed' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Función para obtener el perfil del usuario
const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_USER_BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
