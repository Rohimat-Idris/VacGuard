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
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [buttonAnimation] = useState(new Animated.Value(1));
  const router = useRouter();

  // Function to handle login
  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await fetch('http://192.168.0.2/vaxkids/parents/login.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            username: username,
            password: password,
          }).toString(),
        });

        const data = await response.json();

        if (data.status) {
          // Navigate to home if login is successful
          router.push('/(tabs)/home');
        } else {
          Alert.alert('Login Failed', data.message);
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred during login. Please try again.');
      }
    } else {
      Alert.alert('Input Required', 'Please enter both username and password.');
    }
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
    ]).start(handleLogin);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <View style={styles.header}>
          <Text style={styles.companyName}>VacGuard</Text>
          <Text style={styles.slogan}>Your Ultimate Companion</Text>

          <Ionicons
            name="person-circle-outline"
            size={80}
            color="#0B2F9F"
            style={{ marginVertical: 10 }}
          />
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login to continue</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#0B2F9F"
            value={username}
            onChangeText={setUsername}
            keyboardType="default"
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
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={animateButton}
          style={{ marginTop: 20 }}
        >
          <Animated.View
            style={[styles.button, { transform: [{ scale: buttonAnimation }] }]}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Animated.View>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text
            style={styles.signupText}
            onPress={() => router.push('/Signup')}
          >
            Sign Up
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
  companyName: {
    color: '#0B2F9F',
    fontSize: 36,
    fontWeight: 'bold',
    textShadowColor: '#aaa',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  slogan: {
    color: '#4379F2',
    fontSize: 12,
    marginTop: 3,
    fontStyle: 'italic',
  },
  title: {
    color: '#0B2F9F',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    color: '#000',
    fontSize: 16,
    marginTop: 5,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: 'none',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginVertical: 10,
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
  },
  signupText: {
    color: '#4379F2',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
