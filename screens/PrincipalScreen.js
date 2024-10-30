import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchDogs } from '../api';

const PrincipalScreen = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dogList = await fetchDogs();
        setDogs(dogList);
      } catch (error) {
        console.error("Error fetching dogs:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 2000); // Actualización cada 2 segundos

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Dogs</Text>
      <FlatList
        data={dogs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.dogName}>🐾 {item.name}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Age:</Text>
              <Text style={styles.info}>{item.age}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Weight:</Text>
              <Text style={styles.info}>{item.weight}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Gender:</Text>
              <Text style={styles.info}>{item.gender}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Breed:</Text>
              <Text style={styles.info}>{item.breed}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Contact:</Text>
              <Text style={styles.info}>{item.contactNumber}</Text>
            </View>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 70,
    marginTop: 70,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dogName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF7F50',
    marginBottom: 5,
  },
  owner: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    width: 80,
  },
  info: {
    color: '#555',
  },
  description: {
    marginTop: 10,
    fontStyle: 'italic',
    color: '#666',
  },
});

export default PrincipalScreen;
