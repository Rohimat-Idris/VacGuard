import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';

const ChildProfile = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header Section */}
        <Text style={styles.header}>Welcome Oyiza</Text>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Oyiza</Text>
            <Text style={styles.profileDescription}>
              Access Rohimat's immunization history and upcoming schedule
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText} onPress={()=>router.push('/ViewProfile')}>View Dashboard</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recentl Completed Dose Section */}
        <Text style={styles.sectionHeader}>Recently Completed Dose</Text>
        <View style={styles.doseCard}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
            style={styles.doseImage}
          />
          {/* Text Inside a Card */}
          <View style={styles.textCard}>
            <Text style={styles.doseTitle}>PCV Booster</Text>
            <Text style={styles.doseDescription}>
              Great job! Your child is up-to-date
              with their immunizations.
            </Text>
          </View>
        </View>

        {/* Upcoming Vaccine Section */}
        <Text style={styles.sectionHeader}>Upcoming Vaccine</Text>
        <View style={styles.vaccineCard}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
            style={styles.vaccineImage}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.vaccineTitle}>Vaccination Reminder!</Text>
            <Text style={styles.vaccineDescription}>
              Rohimat is due for the DPT Booster-1 vaccine this month!
            </Text>
            {/* <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity> */}
          </View>
        </View>

        {/* Health Resources Section */}
        <Text style={styles.sectionHeader}>Health Resources</Text>
        <View style={styles.resourceContainer}>
          <TouchableOpacity style={styles.resource}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
              style={styles.resourceImage}
            />
            <Text style={styles.resourceText}>Vaccination Guidelines</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resource}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
              style={styles.resourceImage}
            />
            <Text style={styles.resourceText}>Child Nutrition</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FB', 
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  profileDescription: {
    color: '#555',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0B2F9F',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  doseCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  doseImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textCard: {
    flex: 1,
    backgroundColor: '#F0F0F0', 
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  doseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4379F2',
    marginBottom: 5,
  },
  doseDescription: {
    color: '#555',
  },
  vaccineCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  vaccineImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  vaccineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4379F2',
    marginBottom: 5,
  },
  vaccineDescription: {
    color: '#555',
    marginBottom: 10,
  },
  resourceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  resource: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  resourceImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  resourceText: {
    color: '#0B2F9F',
    fontWeight: 'bold',
  },
});

export default ChildProfile;
