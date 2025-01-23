import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window'); // Get screen width for responsive design



export default function Notification() {
  const fadeAnim = new Animated.Value(0); // For fade-in effect

  React.useEffect(() => {
    // Fade in the header when component is mounted
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Dummy notification data
  const notifications = [
    {
      id: 1,
      title: 'New Vaccine Reminder',
      description: 'Your child’s DTP vaccine is scheduled for tomorrow.',
      time: '5 min ago',
    },
    {
      id: 2,
      title: 'Update Available',
      description: 'A new app update is available. Click here to update now!',
      time: '2 hours ago',
    },
    {
      id: 3,
      title: 'New Tips & Tricks',
      description: 'Check out the latest tips for keeping your child healthy!',
      time: '1 day ago',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header with animation */}
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <LinearGradient colors={['#4379F2', '#0B2F9F']} style={styles.gradient}>
          <View style={styles.headerContent}>
            <Ionicons name="notifications" size={30} color="#fff" />
            <Text style={styles.headerText}>Notifications</Text>
          </View>
        </LinearGradient>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.notificationContainer}>
        {/* Notification List */}
        {notifications.map((notification) => (
          <TouchableOpacity key={notification.id} style={styles.notificationCard}>
            <View style={styles.notificationIcon}>
              <Ionicons name="alert-circle-outline" size={24} color="#4379F2" />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationDescription}>{notification.description}</Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: width * 0.060, // Adjusts font size based on screen width
    fontWeight: 'bold',
    marginLeft: 10,
  },
  notificationContainer: {
    padding: 20,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  notificationIcon: {
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B2F9F',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: '#adb5bd',
    marginTop: 5,
  },
});
