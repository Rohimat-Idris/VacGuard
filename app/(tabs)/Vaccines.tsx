import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have this package installed


const { width } = Dimensions.get('window'); // Get screen width for responsive design


const educationalVaccines = [
  { id: '1', name: 'BCG Vaccine', age: 'At Birth', image: require('../../assets/images/bcg.jpg') },
  { id: '2', name: 'Polio Vaccine (OPV)', age: 'At Birth', image: require('../../assets/images/polio-1dose.jpg') },
  { id: '3', name: 'Hepatitis B (First Dose)', age: 'At Birth', image: require('../../assets/images/bcg.jpg') },
  
  { id: '4', name: 'Polio Vaccine (OPV)', age: '6 Weeks', image: require('../../assets/images/polio-1dose.jpg') },
  { id: '5', name: 'DTP (Diphtheria, Tetanus, Pertussis)', age: '6 Weeks', image: require('../../assets/images/dtp-6.jpg') },
  { id: '6', name: 'Hib (Haemophilus influenzae type b)', age: '6 Weeks', image: require('../../assets/images/hepatitis-b.jpg') },
  { id: '7', name: 'Hepatitis B (Second Dose)', age: '6 Weeks', image: require('../../assets/images/hepatitis-b.jpg') },
  { id: '8', name: 'PCV (Pneumococcal Conjugate Vaccine)', age: '6 Weeks', image: require('../../assets/images/pcv.jpg') },
  { id: '9', name: 'RV (Rotavirus Vaccine)', age: '6 Weeks', image: require('../../assets/images/rotavirus.jpg') },
  
  { id: '10', name: 'Polio Vaccine (OPV)', age: '10 Weeks', image: require('../../assets/images/polio-1dose.jpg') },
  { id: '11', name: 'DTP (Diphtheria, Tetanus, Pertussis)', age: '10 Weeks', image: require('../../assets/images/dtp-6.jpg') },
  { id: '12', name: 'Hib (Haemophilus influenzae type b)', age: '10 Weeks', image: require('../../assets/images/hib.jpg') },
  { id: '13', name: 'PCV (Pneumococcal Conjugate Vaccine)', age: '10 Weeks', image: require('../../assets/images/pcv.jpg') },
  { id: '14', name: 'RV (Rotavirus Vaccine)', age: '10 Weeks', image: require('../../assets/images/rotavirus.jpg') },
  
  { id: '15', name: 'Polio Vaccine (OPV)', age: '14 Weeks', image: require('../../assets/images/polio-1dose.jpg') },
  { id: '16', name: 'DTP (Diphtheria, Tetanus, Pertussis)', age: '14 Weeks', image: require('../../assets/images/dtp-6.jpg') },
  { id: '17', name: 'Hib (Haemophilus influenzae type b)', age: '14 Weeks', image: require('../../assets/images/hepatitis-b.jpg') },
  { id: '18', name: 'PCV (Pneumococcal Conjugate Vaccine)', age: '14 Weeks', image: require('../../assets/images/pcv.jpg') },

  { id: '19', name: 'Yellow Fever Vaccine', age: '9 Months', image: require('../../assets/images/yello-feve.jpg') },
  { id: '20', name: 'Measles Vaccine (First Dose)', age: '9 Months', image: require('../../assets/images/measles.jpg') },

  { id: '21', name: 'Meningitis C Conjugate Vaccine', age: '15 Months', image: require('../../assets/images/meningitis.jpg') },
  
  { id: '22', name: 'Measles Vaccine (Second Dose)', age: '18 Months', image: require('../../assets/images/measles.jpg') },
  
  { id: '23', name: 'DTP (Booster)', age: '2 Years', image: require('../../assets/images/dtp-6.jpg') },
  { id: '24', name: 'Hib (Booster)', age: '2 Years', image: require('../../assets/images/hib.jpg') },
  { id: '25', name: 'PCV (Booster)', age: '2 Years', image: require('../../assets/images/pcv.jpg') },

];


export default function VaccineList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVaccines = educationalVaccines.filter(vaccine =>
    vaccine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePress = (vaccineId: string) => {
    router.push({
      pathname: '/vaccine/[id]',
      params: { id: vaccineId },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Awareness Hub</Text>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a vaccine..."
          placeholderTextColor="#0B2F9F"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {filteredVaccines.length > 0 ? (
        <FlatList
          data={filteredVaccines}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => handlePress(item.id)}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.info}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.ageText}>Age: {item.age}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noResults}>No vaccines found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: width * 0.060, 
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 20,

  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderColor: '#4379F2',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    color: '#0B2F9F',
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 12,
    color: '0b2f9f'
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  itemText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  ageText: {
    fontSize: 12,
    color: '#555',
  },
  noResults: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
