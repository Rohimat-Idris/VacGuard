import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Alert, // For user feedback
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function EditProfile() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [buttonAnimation] = useState(new Animated.Value(1));
  const router = useRouter();

  // Fetch user data when the component loads
  useEffect(() => {
    fetch('http://192.168.0.2/vaxkids/parents/home.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setName(data.data.name);
          setUsername(data.data.username);
          setEmail(data.data.email);
        } else {
          console.error('User not logged in or data unavailable');
        }
      })
      .catch((error) => console.error('Error fetching user data:', error))
      .finally(() => setLoading(false));
  }, []);

  const handleSaveChanges = () => {
    const updatedData = { name, username, email };

    fetch('http://192.168.0.2/vaxkids/parents/edit_parents.php', {
      method: 'POST', // Use PUT or PATCH if your API supports it
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for session
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          Alert.alert('Success', 'Profile updated successfully!');
        } else {
          Alert.alert('Error', data.message || 'Failed to update profile.');
        }
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        Alert.alert('Error', 'An unexpected error occurred.');
      });
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(buttonAnimation, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Edit Profile</Text>
          <Ionicons
            name="person-circle-outline"
            size={80}
            color="#0B2F9F"
            style={{ marginVertical: 10 }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#0B2F9F"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#0B2F9F"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#0B2F9F"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            animateButton();
            handleSaveChanges();
          }}
          style={{ marginTop: 20 }}
        >
          <Animated.View
            style={[styles.button, { transform: [{ scale: buttonAnimation }] }]}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          <Text style={styles.cancelText} onPress={() => router.back()}>
            Cancel
          </Text>
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
   
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    color: '#0B2F9F',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
    textShadowColor: '#aaa',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: '#0B2F9F',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginVertical: 8,
    color: '#000',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#0B2F9F',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#000',
    marginTop: 20,
    fontSize: 14,
    marginBottom: 10,
  },
  cancelText: {
    color: '#4379F2',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
