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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonAnimation] = useState(new Animated.Value(1));

  const handleLogin = () => {
    // Handle login logic here
    alert('Login button pressed');
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
    <LinearGradient colors={['#0B2F9F', '#6439FF']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <View style={styles.header}>
          {/* Company Logo and Slogan */}
          <Text style={styles.companyName}>VaxGuard</Text>
          <Text style={styles.slogan}>Your Ultimate Companion</Text>
          
          {/* Welcome Message */}
          <Ionicons name="person-circle-outline" size={100} color="#FFF" style={{ marginVertical: 20 }} />
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login to continue</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#FFF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#FFF"
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
            style={[
              styles.button,
              { transform: [{ scale: buttonAnimation }] },
            ]}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Animated.View>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text style={styles.signupText}
          // onPress={() => navigation.navigate('Signup')
            >Sign Up</Text>
        </Text>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  companyName: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginBottom: 5,
  },
  slogan: {
    color: '#FFF',
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 30,
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 5,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginVertical: 10,
    color: '#FFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0B2F9F', // Button shadow to add depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#0B2F9F', // Deep blue for button text
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#FFF',
    marginTop: 20,
    fontSize: 14,
  },
  signupText: {
    color: '#000', // Black for signup link text
    fontWeight: 'bold',
  },
});
