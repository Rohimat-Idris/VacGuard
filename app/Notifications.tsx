import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window'); // Get screen width for responsive design

// Define the correct type for reminders
type Reminder = {
  child_name: string;
  vaccine_name: string;
  alarm_date: string;
  alarm_time: string;
};

export default function NotificationsScreen() {
  const fadeAnim = new Animated.Value(0); // For fade-in effect
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fade in the header when the component is mounted
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    fetchReminders();
    registerForPushNotificationsAsync();

    return () => subscription.remove();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await fetch('http://192.168.0.2/vaxkids/api/fetch_reminder.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();

      if (data.success) {
        setReminders(data.reminders as Reminder[]);
        sendPushNotifications(data.reminders);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch reminders.');
    }
  };

  const sendPushNotifications = (reminders: Reminder[]) => {
    reminders.forEach((reminder) => {
      const { child_name, vaccine_name, alarm_date, alarm_time } = reminder;
      const scheduledDate = new Date(`${alarm_date}T${alarm_time}`);
      const now = new Date();

      if (scheduledDate > now) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: `Reminder for ${child_name}`,
            body: `It's time for the ${vaccine_name} vaccine.`,
          },
          trigger: {
            date: scheduledDate,
          },
        });
      }
    });
  };

  const registerForPushNotificationsAsync = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission not granted to show notifications');
      return;
    }
  };

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
        {error && (
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {reminders.map((reminder, index) => (
          <TouchableOpacity key={index} style={styles.notificationCard}>
            <View style={styles.notificationIcon}>
              <Ionicons name="alert-circle-outline" size={24} color="#4379F2" />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{reminder.child_name}</Text>
              <Text style={styles.notificationDescription}>
                {`Vaccine: ${reminder.vaccine_name}`}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {!reminders.length && !error && (
          <View style={styles.noNotificationCard}>
            <Text style={styles.noNotificationText}>No new notifications</Text>
          </View>
        )}
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
    fontSize: width * 0.060, // Adjust font size based on screen width
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
  noNotificationCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noNotificationText: {
    fontSize: 16,
    color: '#6c757d',
  },
  errorCard: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f8d7da',
    borderRadius: 10,
  },
  errorText: {
    color: '#721c24',
    fontSize: 14,
    textAlign: 'center',
  },
});
