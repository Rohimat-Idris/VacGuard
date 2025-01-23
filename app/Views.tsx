import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import axios from 'axios';  // Import axios

interface VaccinationRecordsProps {
  childId: number; // Replace 'number' with the correct type if needed
}

interface VaccinationRecord {
  vaccine: string;
  age: string;
  date: string;
}

interface Reminder {
  vaccine_name: string;
  child_name: string;
  alarm_date: string;
  status: string;

}

export default function VaccinationRecords() {
  // const { child } = useLocalSearchParams(); // Retrieve the passed child data
  // const [childData, setChildData] = useState<any>(null);
  const [records, setRecords] = useState<VaccinationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [showRecords, setShowRecords] = useState(true);
  const [reminders, setReminders] = useState<Reminder[]>([]); // State for upcoming reminders
  const { childId, child } = useLocalSearchParams(); // Extract parameters
  const [childData, setChildData] = useState(null);
  useEffect(() => {
    const fetchChildDetails = async () => {
      try {
        const response = await fetch(`http://192.168.0.2/vaxkids/children/child_profile.php?child_id=${childId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch child details');
        }
        const data = await response.json();
        setChildData(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    if (childId) {
      fetchChildDetails();
    }
  }, [childId]);
  

  useEffect(() => {
    if (childData) {
      // const childId = childData.id; // Assuming 'id' is the field for child ID
      if (showRecords && childId) {
        setLoading(true);
        axios
          .get(`http://192.168.0.2/vaxkids/children/fetch_record.php`, {
            params: {
              child_id: childId,
            },
          })
          .then((response) => {
            if (response.data.status === 'success') {
              if (Array.isArray(response.data.data) && response.data.data.length === 0) {
                setRecords([]); // Set empty records
              } else if (Array.isArray(response.data.data)) {
                setRecords(response.data.data); // Set fetched records
              } else {
                console.error('Data is not an array:', response.data.data);
              }
            } else {
              console.error(response.data.message);
            }
          })
          .catch((error) => {
            console.error('Error fetching records:', error);
          })
          .finally(() => setLoading(false));
      }
    }
  }, [childData, showRecords]); // Dependencies updated to include childData

  // const childId = childData.id; // Assuming 'id' is the field for child ID


  //Reminder section
  useEffect(() => {
    if (childData) {
      setLoading(true);
      axios
        .post('http://192.168.0.2/vaxkids/children/child_reminder.php', {
          child_id: childId,
        })
        .then((response) => {
          if (response.data.status === "success") {
            const currentDate = new Date();
            const updatedReminders = response.data.data.map((reminder: Reminder) => {
              const reminderDate = new Date(reminder.alarm_date);
              if (reminderDate.toDateString() === currentDate.toDateString()) {
                reminder.status = "terminating_today";
              } else {
                reminder.status = "upcoming";
              }
              return reminder;
            });
            setReminders(updatedReminders);
          } else {
            console.error("Backend Error:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Network Error:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [childData]);
  

  if (!childData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const { child_name, gender, dob, age, blood_group, state_of_origin, username, date_of_birth, height, weight } = childData;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hi, {username}</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Text style={styles.profileName}>{child_name}</Text>
        <View style={styles.profileDetails}>
          {[{ icon: 'time-outline', text: `${age}` },
            { icon: 'calendar-outline', text: `${dob}` },
            { icon: 'person-outline', text: `${gender}` },
            { icon: 'water-outline', text: `${blood_group}` },
            { icon: 'location-outline', text: `${state_of_origin}` }].map((detail, index) => (
              <View key={index} style={styles.detailRow}>
                <Ionicons
                  name={detail.icon as keyof typeof Ionicons.glyphMap}
                  size={16}
                />
                <Text style={styles.profileDetail}>{` ${detail.text}`}</Text>
              </View>
            ))}
        </View>
        <TouchableOpacity
  style={styles.viewDetailsButton}
  onPress={() =>
    router.push({
      pathname: '/ViewProfile', // Change to the actual route for your details screen
      params: { childId, childName: child_name }, // Pass additional data if needed
    })
  }
>
  <Text style={styles.viewDetailsButtonText}>View Details</Text>
</TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollableContent}>
        {/* Upcoming Vaccine Section */}
        <View style={styles.upcomingVaccineContainer}>
  <Text style={styles.upcomingTitle}>Upcoming Vaccine</Text>
  {loading ? (
    <ActivityIndicator size="large" color="#000" />
  ) : reminders.length > 0 ? (
    reminders.map((reminder, index) => (
      <View key={index} style={styles.reminderCard}>
        <Ionicons
          name="alarm-outline"
          size={50}
          color="#000"
          style={styles.timerIcon}
        />
        <View style={styles.reminderContent}>
          {reminder.status === "terminating_today" ? (
            <Text style={styles.reminderText}>
              <Text style={styles.reminderTitle}>Reminder!</Text>
              {'\n'}
              {child_name}'s reminder for the{' '}
              <Text style={{ fontWeight: 'bold' }}>{reminder.vaccine_name}</Text>{' '}
              vaccine is <Text style={{ fontWeight: 'bold' }}>terminating today</Text> on{' '}
              <Text style={{ fontWeight: 'bold' }}>{reminder.alarm_date}</Text>.
            </Text>
          ) : (
            <Text style={styles.reminderText}>
              <Text style={styles.reminderTitle}>Reminder!</Text>
              {'\n'}
              {child_name} is due for the{' '}
              <Text style={{ fontWeight: 'bold' }}>{reminder.vaccine_name}</Text>{' '}
              vaccine on{' '}
              <Text style={{ fontWeight: 'bold' }}>{reminder.alarm_date}</Text>.
            </Text>
          )}
        </View>
      </View>
    ))
  ) : (
    <Text style={styles.noReminderText}>No upcoming vaccines for this child.</Text>
  )}
</View>


        {/* Vaccination Records */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Vaccination Records</Text>
            <TouchableOpacity onPress={() => setShowRecords(!showRecords)}>
              <Ionicons name={showRecords ? 'chevron-up' : 'chevron-down'} size={24} />
            </TouchableOpacity>
          </View>

          {showRecords && (
            <>
             <FlatList
              data={records}
              keyExtractor={(item, index) => `${item.vaccine}-${index}`} // Use a unique key
              renderItem={({ item }) => (
                <View style={styles.recordItem}>
                  <Text style={styles.recordText}>{item.age}</Text>
                  <Text style={styles.recordText}>{item.vaccine}</Text>
                  <Text style={styles.recordText}>{item.date}</Text>
               </View>
             )}
            />

            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileDetails: {
    marginVertical: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  profileDetail: {
    fontSize: 16,
  },
  viewDetailsButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewDetailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollableContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  recordText: {
    fontSize: 16,
  },
  upcomingVaccineContainer: {
    marginBottom: 20,
  },
  upcomingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 10,
  },
  timerIcon: {
    marginRight: 10,
  },
  reminderContent: {
    flex: 1,
  },
  reminderText: {
    fontSize: 16,
  },
  reminderTitle: {
    fontWeight: 'bold',
  },
  addRecordButton: {
    backgroundColor: '#0b2f9f',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  addRecordButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noRecordText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  noReminderText:{
    textAlign: 'center',
    marginTop: 20
  }
});
