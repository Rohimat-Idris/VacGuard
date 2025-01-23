import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Image, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
// import { registerForPushNotificationsAsync, setupNotificationHandlers } from '../PushNotification';
// import { savePushTokenToBackend } from '../SaveToken';

const { width } = Dimensions.get('window'); // Get screen width for responsive design

type Vaccine = {
  id: string;
  name: string;
  age: string;
  image: any;  // Change the type to 'any' for local images
};

const Home = () => {
  const [userName, setUserName] = useState('Guest'); // Default username
  const [userDetails, setUserDetails] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredVaccines, setFilteredVaccines] = useState<Vaccine[]>([]);
  const [parentId, setParentId] = useState<number | null>(null);  
  const [childReminders, setChildReminders] = useState<any[]>([]); 


  const [vaccines, setVaccines] = useState<Vaccine[]>([
    { id: '1', name: 'BCG Vaccine', age: 'At Birth', image: require('../../assets/images/bcg.jpg') },
    { id: '2', name: 'OPV Vaccine', age: 'At Birth', image: require('../../assets/images/hepatitis-b.jpg') },
    { id: '3', name: 'Hepatitis B Vaccine', age: 'At Birth', image: require('../../assets/images/hepatitis-b.jpg') },
    { id: '4', name: 'OPV Vaccine', age: '6-Weeks', image: require('../../assets/images/polio-6.jpg') },
    { id: '5', name: 'DPT Vaccine', age: '0-6 Weeks', image: require('../../assets/images/dtp-6.jpg') },
    { id: '6', name: 'HIB Vaccine', age: '0-6 Weeks', image: require('../../assets/images/hib.jpg') },
    { id: '7', name: 'Hepatitis B', age: '0-6 Weeks', image: require('../../assets/images/hepatitis-b.jpg') },
  ]);

  // const [notificationCount] = useState(3); // Example notification count
  const [notificationCount, setNotificationCount] = useState(0);


  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Fetch the username from PHP session
 // To store full user details
  useEffect(() => {
    fetch('http://192.168.0.2/vaxkids/parents/home.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for session
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          // Set the username and store the full user details
          setUserName(data.data.username); 
          setUserDetails(data.data); // Store full user details
        } else {
          // Handle the case where the user is not logged in
          setUserName('Guest');
        }
      })
      .catch(error => {
        console.error('Error fetching session data:', error);
        setUserName('Guest'); // Fallback for errors
      });
  }, []);


  console.log("Initial Parent ID:", parentId);

  // useEffect(() => {
  //   // Log inside useEffect to check when parentId changes
  //   console.log("Parent ID inside useEffect:", parentId);

  //   if (parentId !== null) {
  //     const url = `http://192.168.0.2/vaxkids/parents/fetch_reminder.php?parent_id=${parentId}`;
  //     console.log("API URL:", url);

  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data.error) {
  //           console.error(data.error);
  //         } else {
  //           setChildReminders(data);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching child reminders:", error);
  //       });
  //   } else {
  //     console.error("Parent ID is not set.");
  //   }
  // }, [parentId]);


  
// Searching UseEffect
  useEffect(() => {
    if (searchText === '') {
      setFilteredVaccines(vaccines);
    } else {
      const filtered = vaccines.filter(vaccine =>
        vaccine.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredVaccines(filtered);
    }
  }, [searchText, vaccines]);

  const renderVaccineItem = ({ item }: { item: Vaccine }) => (
    <View style={styles.vaccineCard}>
      <Image style={styles.vaccineImage} source={item.image} />
      <Text style={styles.vaccineCardTitle}>{item.name}</Text>
      <Text style={styles.vaccineCardSubtitle}>{item.age}</Text>
    </View>
  );




  return (
    <View style={styles.container}>
      <View style={styles.greetingSection}>
        <View style={styles.greetingHeader}>
          <Text style={styles.greetingText}>{`${getGreeting()}, ${userName}`}</Text>
          {/* <TouchableOpacity style={styles.notificationIcon}>
  <Ionicons name="notifications-outline" size={22} color="#4379F2" />
  {notificationCount > 0 && (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{notificationCount}</Text>
    </View>
  )}
</TouchableOpacity> */}

        </View>
        <Text style={styles.subtitle}>
          Keep your child’s vaccinations on track with VacGuard, your trusted immunization assistant.
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={24} color="#0B2F9F" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for vaccines or sections..."
          placeholderTextColor="#0B2F9F"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Main Content */}

      {/* Next scheduled vaccines */}
      <ScrollView>
        {/* <View style={styles.nextVaccineSection}>
          <Text style={styles.sectionHeader}>Next Scheduled Vaccine</Text>
          <View style={styles.nextVaccineCard}>
            <View style={styles.vaccineDetails}>
              <Text style={styles.vaccineTitle}>Child name: Hepatitis B</Text>
              <Text style={styles.vaccineAge}>Vaccine name: 0-1 Month</Text>
              <Text style={styles.vaccineDate}>Due Date: 25th Sep 2024</Text>
            </View>
          </View>
        </View>  */}

        {/* Vaccine List */}
        <View style={styles.vaccineListSection}>
          <Text style={styles.sectionHeader}>Vaccines Type</Text>
          {filteredVaccines.length > 0 ? (
            <FlatList
              data={filteredVaccines}
              renderItem={renderVaccineItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.noResultsText}>No vaccines or sections found.</Text>
          )}
        </View>

        {/* Educational Section */}
        {/* Educational Section */}
<Text style={styles.sectionHeader}>Why Vaccinate?</Text>
<View style={styles.whyVaccinateSection}>
  <Text style={styles.whyText}>
    Vaccinations are crucial for protecting your child from serious diseases. 
    By vaccinating, you not only protect your child but also help protect your community.
  </Text>
  <Text style={styles.whyText}>
    💉 Vaccines prevent the spread of diseases that can cause lifelong complications or even death. 
    Don't wait for illness to strike—act now and safeguard your child's health.
  </Text>
  <Text style={styles.whyText}>
    🌍 By vaccinating, you're contributing to global efforts to eliminate preventable diseases, 
    ensuring a healthier future for your child and others. 
  </Text>
  <Text style={styles.whyText}>
    ✅ Vaccines are safe, tested, and recommended by health professionals worldwide.
  </Text>
  <Text style={styles.whyText}>
    Stay on track with your child's immunization schedule for a healthy, happy future!
  </Text>
</View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  greetingSection: {
    marginBottom: 20,
    marginTop: 20,
  },
  greetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: width * 0.060, // Adjusts font size based on screen width
    fontWeight: 'bold',
    color: '#000',
  },
  notificationIcon: {
    position: 'relative',
    backgroundColor: '#f0f0f0',
    padding: 6,
    borderRadius: 30,
    marginTop: 10,
    elevation: 6, // Adds shadow
  },
  badge: {
    position: 'absolute',
    right: -4, // Positions the badge on top right
    top: -5,
    backgroundColor: '#0b2f9f',
    borderRadius: 20,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: width * 0.03, // Small subtitle under greeting
    color: '#000',
    marginTop: 5,
  },
  searchBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#0B2F9F',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#333',
  },
  nextVaccineSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: width * 0.04, // Section header font size
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  nextVaccineCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  vaccineDetails: {
    marginLeft: 15,
  },
  vaccineTitle: {
    fontSize: width * 0.04, // Font size for vaccine title
    fontWeight: 'bold',
    color: '#000',
  },
  vaccineAge: {
    fontSize: 10,
    color: '#4379F2',
  },
  vaccineDate: {
    fontSize: 10,
    color: '#888',
    marginTop: 5,
  },
  vaccineListSection: {
    marginBottom: 20,
  },
  vaccineCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    marginRight: 10,
    width: width * 0.4, // Card width is 40% of the screen width
    alignItems: 'center',
    elevation: 6, // Adds shadow for elevation
  },
  vaccineImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 360, // Makes the image circular
  },
  vaccineCardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  vaccineCardSubtitle: {
    fontSize: 10,
    color: '#888',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  whyVaccinateSection: {
    backgroundColor: '#0b2f9f',
    color: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  whyText: {
    color: '#fff',
    fontSize: 14,
  },
});


export default Home;
