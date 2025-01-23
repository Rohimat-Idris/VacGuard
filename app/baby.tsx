import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';


interface ProfileInfoProps {
  icon: string;
  value: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ icon, value }) => (
  <View style={styles.profileInfo}>
    <Ionicons name={icon} size={20} color="#4379F2" />
    <Text style={styles.profileValue}>{value}</Text>
  </View>
);

interface ProfileCardProps {
  childData: any; // Replace 'any' with your specific child data type
  parentId: string | number; // Replace 'any' with your specific child data type
}


interface Record {
  record_id: string | number;  // Adjust the type as per your data
  status: string;
}


const ProfileCard: React.FC<ProfileCardProps> = ({ childData, parentId }) => {
  const router = useRouter();
  // const [childData, setChildData] = useState<any>(null);
  // const [parentId, setParentId] = useState<number | null>(null);
 const [records, setRecords] = useState<Record[]>([]); // Explicitly typing as Record[]

    useEffect(() => {
        fetch(`https://your-api-url.com/fetch-records.php?parent_id=${parentId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'success') {
                    setRecords(data.data);  // Ensure the data is of type Record[]
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => console.error(error));
    }, [parentId]);

    const updateStatus = (recordId: string | number) => {
        fetch('https://your-api-url.com/update-record-status.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ record_id: recordId }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'success') {
                    alert(data.message);
                    // Update local state
                    setRecords((prevRecords) =>
                        prevRecords.map((record) =>
                            record.record_id === recordId
                                ? { ...record, status: 'success' }
                                : record
                        )
                    );
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => console.error(error));
    };

  return (
    <View style={styles.profileCard}>
      <View style={styles.profileDetails}>
        <Text style={styles.profileName}>{childData.child_name}</Text>
        <Text style={styles.profileAge}>2 Months</Text>
        <ProfileInfo icon="calendar-outline" value={childData.dob} />
        <ProfileInfo icon="person" value={childData.gender} />
        <ProfileInfo icon="water-outline" value={childData.blood_group} />
        <ProfileInfo icon="location-outline" value={childData.state_of_origin} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.bookButton} onPress={() => router.push('/ViewDetail')}>
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ProfileSection: React.FC<{ childData: any, parentId: number }> = ({ childData, parentId }) => (
  <View style={styles.profileContainer}>
    <Text style={styles.profileTitle}>Hi, {childData.username}</Text>
    {/* <ProfileCard childData={childData} /> */}
    <ProfileCard childData={childData} parentId={parentId} />

  </View>
);

const RecentlyCompletedDose: React.FC<{ childData: any}> = ({ childData }) => (
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
);

const UpcomingVaccineSection: React.FC<{ childData: any}> = ({ childData }) => (
  <View style={styles.upcomingVaccineContainer}>
    <Text style={styles.upcomingTitle}>Upcoming Vaccine</Text>
    <View style={styles.reminderCard}>
      <Ionicons name="alarm-outline" size={50} color="#000" style={styles.timerIcon} />
      <View style={styles.reminderContent}>
        <Text style={styles.reminderText}>
          <Text style={styles.reminderTitle}>Reminder!</Text>
          {'\n'}
          {childData.username} is due for the <Text>DPT Booster-1</Text> vaccine this month!
        </Text>
      </View>
    </View>
  </View>
);

interface VaccinationRecordRowProps {
  showFullRecord: boolean;
}

const VaccinationRecordRow: React.FC<VaccinationRecordRowProps> = ({ showFullRecord }) => (
  <>
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
            <Text style={styles.rowText}>No Status</Text>
            <Text style={styles.rowText}>No Status</Text>
          </>
        )}
      </View>
      <View style={styles.rowBtn}>
        <Text style={styles.rowTextBtn}>pending</Text>
      </View>
    </View>
  </>
);

interface VaccinationRecordSectionProps {
  showFullRecord: boolean;
  handleViewRecord: () => void;
}

const VaccinationRecordSection: React.FC<VaccinationRecordSectionProps> = ({
  showFullRecord,
  handleViewRecord,
}) => (
  <View style={styles.vaccinationRecordContainer}>
    <Text style={styles.recordTitle}>Vaccination Record</Text>
    <Text style={styles.addResult} onPress={()=>router.push('/AddRecord')}>Add Result</Text>
    <View style={styles.recordTable}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Age</Text>
        <Text style={styles.headerText}>Vaccine</Text>
        <Text style={styles.headerText}>Completion Date</Text>
        <Text style={styles.headerText}>Status</Text>
      </View>
      <VaccinationRecordRow showFullRecord={showFullRecord} />
      <TouchableOpacity style={styles.viewRecordButton} onPress={handleViewRecord}>
        <Text style={styles.viewRecordText}>
          {showFullRecord ? 'Hide Full Record' : 'View Full Record'}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const ViewProfile: React.FC = () => {
  const { child } = useLocalSearchParams();
  const childData = child ? JSON.parse(child as string) : null; // Parse the child data

  const [showFullRecord, setShowFullRecord] = useState<boolean>(false);

  const handleViewRecord = () => {
    setShowFullRecord(!showFullRecord);
  };

  if (!childData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Child data is not available.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} stickyHeaderIndices={[0]}>
      <ProfileSection childData={childData} />
      <RecentlyCompletedDose childData={childData} />
      <UpcomingVaccineSection childData={childData} />
      <VaccinationRecordSection
        showFullRecord={showFullRecord}
        handleViewRecord={handleViewRecord}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  profileContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  profileTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    // textDecorationStyle: 'dashed',
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
  },
  profileDetails: {
    flex: 1,
    marginLeft: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileAge: {
    fontSize: 16,
    color: '#777',
    marginBottom: 15,
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
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentDoseContainer: {
    marginVertical: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  doseDescription: {
    color: '#555',
  },
  upcomingVaccineContainer: {
    marginVertical: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
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
    color: '#555',
  },
  reminderTitle: {
    fontWeight: 'bold',
  },
  vaccinationRecordContainer: {
    marginVertical: 20,
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
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recordTable: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    marginBottom: 5,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#555',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  rowBtn: {
    padding: 5,
    backgroundColor: '#0b2f9f',
    borderRadius: 5

  },
  rowTextBtn: {
    color: '#fff'
  },
  rowText: {
    color: '#555',
    fontSize: 12,
  },
  viewRecordButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  viewRecordText: {
    color: '#0B2F9F',
    fontWeight: 'bold',
  },
  dueText: {
    color: 'red',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  addResult: {
    color: '#4379F2',
    fontSize: 14
  }
});

export default ViewProfile;
