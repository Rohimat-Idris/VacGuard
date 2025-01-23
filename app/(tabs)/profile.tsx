import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Import for gradient background
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = () => {
  const [userName, setUserName] = useState('Guest'); // Default username
  const [userDetails, setUserDetails] = useState(null); // To store full user details

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


    // Logout function to destroy session

    const handleLogout = () => {
      // Clear session data from AsyncStorage
      AsyncStorage.clear()
        .then(() => {
          // Send logout request to the server to destroy the session on the back-end
          fetch('http://192.168.0.3/vaxkids/parents/logout.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Ensure cookies are sent with the request
          })
            .then(response => response.json())
            .then(data => {
              if (data.status === 'success') {
                // Redirect to login screen and replace the current navigation stack
                router.replace('/Login');
              } else {
                // Handle error in logout
                console.error('Logout failed');
              }
            })
            .catch(error => {
              console.error('Error during logout:', error);
            });
        })
        .catch(error => {
          console.error('Error clearing session:', error);
        });
    };
    
    
  return (
    <View style={styles.container}>
      {/* Gradient background for profile header */}
      <LinearGradient colors={['#0B2F9F', '#4379F2']} style={styles.header}>
        <View style={styles.profileImageContainer}>
        <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.profileImage}
      />
          {/* <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create" size={20} color="white" />
          </TouchableOpacity> */}
        </View>
        <Text style={styles.userName}>{userName}</Text>
      </LinearGradient>

      {/* Wrap options inside ScrollView */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="pencil" size={24} color="#0B2F9F" />
            <Text style={styles.optionText} onPress={()=>router.push('/EditProfile')}>Edit Profile</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.option}>
            <Ionicons name="key" size={24} color="#0B2F9F" />
            <Text style={styles.optionText}
            onPress={()=>router.push('/ChangePassword')}
            >Change Password</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.option}>
            <Ionicons name="information-circle" size={24} color="#0B2F9F" />
            <Text style={styles.optionText} onPress={()=>router.push('/Views')}>Information</Text>
          </TouchableOpacity> */}

          {/* New Options for Immunization App */}
          <TouchableOpacity style={styles.option}>
            <Ionicons name="add-circle-outline" size={24} color="#0B2F9F" />
            <Text style={styles.optionText}
            onPress={()=>router.push('/AddChild')}
            >Add Kid</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="document-text" size={24} color="#0B2F9F" />
            <Text style={styles.optionText} onPress={()=>router.push('/ChildrenList')}>View kids</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="notifications-outline" size={24} color="#0B2F9F" />
            <Text style={styles.optionText} onPress={()=>router.push('/SetReminder')}>Set Reminders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="document-text" size={24} color="#0B2F9F" />
            <Text style={styles.optionText} onPress={()=>router.push('/AddRecord')}>Add Kids Records</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.option}>
            <Ionicons name="notifications-outline" size={24} color="#0B2F9F" />
            <Text style={styles.optionText} onPress={()=>router.push('/PushNotification')}>Push Notiification</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.option} onPress={handleLogout}>
            <Ionicons name="log-out" size={24} color="#0B2F9F" />
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', 
    // marginTop: 10
  },
  header: {
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    marginTop: 40,
  },
  profileImageContainer: {
    position: 'relative',
    width: 130,
    height: 130,
    borderRadius: 65,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  userName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  optionsContainer: {
    padding: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 15,
  },
});

export default Profile;
