import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buttonAnimation] = useState(new Animated.Value(1));
  const router = useRouter();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }
  
    // Send data to PHP backend
    fetch('http://192.168.0.2/vaxkids/parents/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `name=${name}&username=${username}&email=${email}&password=${password}&confirm_password=${confirmPassword}`,
    })
      .then((response) => response.text()) // Handle the response text from PHP
      .then((data) => {
        if (data.includes('Registration successful')) {
          Alert.alert('Success', 'Registration successful!');
          router.push('/Login'); // Redirect to the login page
        } else if (data.includes('Username already exists')) {
          Alert.alert('Error', 'Username already exists!');
        } else if (data.includes('Email already exists')) {
          Alert.alert('Error', 'Email already exists!');
        } else {
          Alert.alert('Error', data); // Show any other errors returned from the backend
        }
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to connect to the server. Please try again later.');
        console.error('Error:', error);
      });
  };
  
  // Button animation
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
    ]).start(handleRegister);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inner}
        >
          {/* Header with Company Information */}
          <View style={styles.header}>
            <Text style={styles.title}>VacGuard</Text>
            <Text style={styles.subtitle}>Your ultimate companion</Text>
            <Ionicons
              name="shield-checkmark-outline"
              size={80}
              color="#0B2F9F"
              style={{ marginVertical: 10 }}
            />
          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <Text style={styles.create}>Create Account to safeguard your Vaccines</Text>
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
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#0B2F9F"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#0B2F9F"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          {/* Register Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={animateButton}
            style={{ marginTop: 20 }}
          >
            <Animated.View
              style={[
                styles.button,
                { transform: [{ scale: buttonAnimation }] },
              ]}
            >
              <Text style={styles.buttonText}>Signup</Text>
            </Animated.View>
          </TouchableOpacity>

          {/* Footer for Navigation to Login */}
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text style={styles.loginText} onPress={() => router.push('/Login')}>
              Login
            </Text>
          </Text>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
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
    marginBottom: 20,
    marginTop: 20,
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
  subtitle: {
    color: '#4379F2',
    fontSize: 12,
    marginTop: 1,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#FFF',
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
  loginText: {
    color: '#4379F2',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  create: {
    color: '#000',
    fontSize: 12,
    marginBottom: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#aaa',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});
