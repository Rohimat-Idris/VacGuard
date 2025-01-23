import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

const Profile: React.FC = () => {
  const router = useRouter();
  const { childData } = useLocalSearchParams();
  const parsedChildData = childData ? JSON.parse(childData as string) : null;

  const [showFullRecord, setShowFullRecord] = React.useState(false);

  if (!parsedChildData) {
    return <Text style={styles.errorText}>No child data found.</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Profile Card (Static) */}
      <View style={styles.profileCard}>
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{parsedChildData.child_name}</Text>
          <Text style={styles.profileAge}>2 Months</Text>
          <ProfileInfo icon="calendar-outline" value={parsedChildData.dob} />
          <ProfileInfo icon="person-outline" value={parsedChildData.gender} />
          <ProfileInfo icon="water-outline" value={parsedChildData.blood_group} />
          <ProfileInfo icon="location-outline" value={parsedChildData.state_of_origin} />

          <View style={styles.buttonContainer}>
            {/* <TouchableOpacity style={styles.bookButton} onPress={() => router.push('/ViewDetail')}>
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollViewContent}>
        {/* Recently Completed Dose */}
        <View style={styles.recentDoseContainer}>
          <Text style={styles.sectionHeader}>Recently Completed Dose</Text>
          <View style={styles.doseCard}>
            <Ionicons name="medkit-outline" size={50} color="#000" style={styles.doseIcon} />
            <View style={styles.textCard}>
              <Text style={styles.doseTitle}>PCV Booster</Text>
              <Text style={styles.doseDescription}>
                Great job! Your child is up-to-date with their immunizations.
              </Text>
            </View>
          </View>
        </View>

        {/* Upcoming Vaccine Section */}
        <View style={styles.upcomingVaccineContainer}>
          <Text style={styles.upcomingTitle}>Upcoming Vaccine</Text>
          <View style={styles.reminderCard}>
            <Ionicons name="alarm-outline" size={50} color="#000" style={styles.timerIcon} />
            <View style={styles.reminderContent}>
              <Text style={styles.reminderText}>
                <Text style={styles.reminderTitle}>Reminder!</Text>
                {'\n'}
                {parsedChildData.username} is due for the <Text>DPT Booster-1</Text> vaccine this month!
              </Text>
            </View>
          </View>
        </View>

        {/* Vaccination Records Section */}
        <View style={styles.recordContainer}>
          <Text style={styles.recordTitle}>Vaccination Records</Text>
          <VaccinationRecordRow showFullRecord={showFullRecord} />
          <TouchableOpacity onPress={() => setShowFullRecord(!showFullRecord)}>
            <Text style={styles.toggleText}>{showFullRecord ? 'Show Less' : 'Show More'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

interface ProfileInfoProps {
  icon: string; // Icon name as a string
  value: string; // Value displayed as a string
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ icon, value }) => (
  <View style={styles.profileInfo}>
    <Ionicons name={icon} size={20} color="#4379F2" />
    <Text style={styles.profileValue}>{value}</Text>
  </View>
);


const VaccinationRecordRow = ({ showFullRecord }) => (
  <>
    <View style={styles.tableRow}>
      <Text style={styles.headerText}>Age</Text>
      <Text style={styles.headerText}>Vaccine</Text>
      <Text style={styles.headerText}>Completion Date</Text>
    </View>
    
    <View style={styles.tableRow}>
      <Text style={styles.rowText}>4-6 years</Text>
      <View>
        <Text style={styles.rowText}>DPT/DTaP 2nd Booster</Text>
        {showFullRecord && (
          <>
            <Text style={styles.rowText}>MMR 2nd</Text>
            <Text style={styles.rowText}>Typhoid</Text>
            <Text style={styles.rowText}>Chickenpox</Text>
          </>
        )}
      </View>
      <View>
        <Text style={styles.rowText}>9/12/23</Text>
        {showFullRecord && (
          <>
            <Text style={[styles.rowText, styles.dueText]}>Due in June</Text>
            <Text style={[styles.rowText, styles.dueText]}>Due in August</Text>
            <Text style={[styles.rowText, styles.dueText]}>Due in September</Text>
          </>
        )}
      </View>
    </View>
    
    {showFullRecord && <Text style={styles.noteText}>All vaccinations are important to ensure your child's health.</Text>}
  </>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 10,
    marginTop: 30,
  },
  profileDetails: {
    flex: 1,
    marginLeft: 20,
  },
  profileName: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileAge: {
    fontSize: 16,
    color: '#777',
    marginBottom: 15,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  profileValue: {
    fontSize: 16,
    color: '#555',
    marginLeft: 5,
  },
  buttonContainer: {
    marginTop: 10,
  },
  bookButton: {
    backgroundColor: '#0B2F9F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  recentDoseContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  doseCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doseIcon: {
    marginRight: 10,
  },
  textCard: {
    flex: 1,
  },
  doseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  doseDescription: {
    fontSize: 14,
    color: '#777',
  },
  upcomingVaccineContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  upcomingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerIcon: {
    marginRight: 10,
  },
  reminderContent: {
    flex: 1,
  },
  reminderText: {
    fontSize: 16,
    color: '#000',
  },
  reminderTitle: {
    fontWeight: 'bold',
  },
  recordContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  recordTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  rowText: {
    fontSize: 14,
    color: '#555',
  },
  dueText: {
    color: 'red',
  },
  noteText: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  toggleText: {
    fontSize: 14,
    color: '#4379F2',
    textAlign: 'right',
    marginTop: 5,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    padding: 8,
    // Add any other styling you wish, such as colors or margins
  },
});

export default Profile;
