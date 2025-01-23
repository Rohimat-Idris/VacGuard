import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

interface ChildDetailsProps {
  label: string;
  value: string | number;
  icon: keyof typeof MaterialIcons.glyphMap;
}

export default function ChildDetails() {
  const { childId, childName } = useLocalSearchParams();
  const router = useRouter();
  const [childDetails, setChildDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildDetails = async () => {
      try {
        const response = await fetch(`http://192.168.0.2/vaxkids/children/child_profile.php?child_id=${childId}`);
        const data = await response.json();
        setChildDetails(data);
      } catch (error) {
        console.error('Error fetching child details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (childId) fetchChildDetails();
  }, [childId]);

  const handleEdit = () => {
    router.push({
      pathname: '/EditChild',
      params: {
        childId,
        childName,
        childData: JSON.stringify(childDetails),
      },
    });
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Child',
      'Are you sure you want to delete this child record?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const response = await fetch('http://192.168.0.2/vaxkids/children/delete_child.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ child_id: childId }),
              });

              const result = await response.json();
              if (result.success) {
                Alert.alert('Success', 'Child record deleted successfully.');
                router.push('/ChildrenList');
              } else {
                Alert.alert('Error', result.message || 'Failed to delete child record.');
              }
            } catch (error) {
              console.error('Error deleting child record:', error);
              Alert.alert('Error', 'An error occurred while deleting the record.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4379F2" />
        <Text style={styles.loadingText}>Loading child details...</Text>
      </View>
    );
  }

  if (!childDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDetailsText}>No details found for this child.</Text>
      </View>
    );
  }

  const { gender, dob, age, blood_group, state_of_origin, height, weight, genotype, address, guardian_name, relationship } = childDetails;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{childName}'s Details</Text>
      <View style={styles.card}>
        <DetailItem label="Gender" value={gender} icon="person" />
        <DetailItem label="Date of Birth" value={dob} icon="calendar-today" />
        <DetailItem label="Age" value={age} icon="cake" />
        <DetailItem label="Blood Group" value={blood_group} icon="water-drop" />
        <DetailItem label="Height" value={`${height} cm`} icon="height" />
        <DetailItem label="Weight" value={`${weight} kg`} icon="fitness-center" />
        <DetailItem label="Genotype" value={genotype} icon="bloodtype" />
        <DetailItem label="Address" value={address} icon="home" />
        <DetailItem label="Guardian's Name" value={guardian_name} icon="person-outline" />
        <DetailItem label="Relationship" value={relationship} icon="group" />
        <DetailItem label="State of Origin" value={state_of_origin} icon="map" />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function DetailItem({ label, value, icon }: ChildDetailsProps) {
  return (
    <View style={styles.detailItem}>
      <MaterialIcons name={icon} size={20} color="#0B2F9F" />
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    flex: 2,
  },
  noDetailsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#0B2F9F',
    borderRadius: 8,
    padding: 10,
    flex: 0.45,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF4E4E',
    borderRadius: 8,
    padding: 10,
    flex: 0.45,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
