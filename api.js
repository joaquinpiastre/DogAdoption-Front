import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// swagger ip : http://localhost:8080/swagger-ui.html
// URL base del servidor
// Ip facultad 10.51.11.138
// Ip casa 192.168.0.102

const API_AUTH_BASE_URL = 'http://10.51.11.138:8080/auth';
const API_USER_BASE_URL = 'http://10.51.11.138:8080/users';
const API_DOG_BASE_URL = 'http://10.51.11.138:8080/dogs';

// Función para manejar el inicio de sesión
export const handleLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_AUTH_BASE_URL}/login`, { email, password });
    if (response.status === 200) {
      const token = response.data.token;
      await AsyncStorage.setItem('@jwt_token', token);
      const userResponse = await getUserProfile(token);
      return { success: true, data: userResponse.data };
    } else {
      return { success: false, error: 'Invalid response status' };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.status === 401 ? 'Invalid credentials' : error.message,
    };
  }
};

// Función para manejar el registro
export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_AUTH_BASE_URL}/register`, { name, email, password });
    return { success: true, message: response.data.message || 'User registered successfully' };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

// Función para obtener el perfil del usuario
const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_USER_BASE_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Error getting user profile:", error.message);
    throw error;
  }
};

// Función para obtener un usuario por nombre de usuario
export const getUserByUsername = async (name) => {
  try {
    const response = await axios.get(`${API_USER_BASE_URL}/find?name=${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by name:", error.message);
    throw error;
  }
};

// Función para agregar un nuevo perro
export const addDog = async (dogData) => {
  try {
    const token = await AsyncStorage.getItem('@jwt_token');
    const response = await axios.post(`${API_DOG_BASE_URL}/add`, dogData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding dog:", error.response ? error.response.data : error.message);
    throw error;
  }
};


// Función para obtener todos los perros desde la base de datos
export const fetchDogs = async () => {
  try {
    const token = await AsyncStorage.getItem('@jwt_token');
    if (!token) {
      throw new Error("No token found"); // Manejo de errores si no hay token
    }
    
    const response = await axios.get(`${API_DOG_BASE_URL}/all`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dogs:", error.response ? error.response.data : error.message);
    throw error;
  }
};



export const updateUserProfile = async (data) => {
  try {
    const token = await AsyncStorage.getItem('@jwt_token');
    const userProfileResponse = await getUserProfile(token);
    const userId = userProfileResponse.data.id;

    const response = await axios.put(`${API_USER_BASE_URL}/update?userId=${userId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to update profile.');
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'Failed to update profile. Please try again.');
  }
};