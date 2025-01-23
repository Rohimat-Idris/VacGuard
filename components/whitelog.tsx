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
// import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonAnimation] = useState(new Animated.Value(1));
  const navigation = useNavigation(); // Initialize navigation

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
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <View style={styles.header}>
          {/* Company Logo and Slogan */}
          <Text style={styles.companyName}>VaxGuard</Text>
          <Text style={styles.slogan}>Your Ultimate Companion</Text>

          {/* Welcome Message */}
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
          <Text
            style={styles.signupText}
            // onPress={() => navigation.navigate('Signup')} // Navigate to Signup
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
    backgroundColor: '#FFF', // White background
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
    color: '#0B2F9F', // Dark blue for company name
    fontSize: 36,
    fontWeight: 'bold',
    textShadowColor: '#aaa',
    textShadowOffset: { width: 2, height: 2},
    textShadowRadius: 5,
  },
  slogan: {
    color: '#4379F2', // Purple for slogan
    fontSize: 12,
    marginTop: 3,
    fontStyle: 'italic',
  },
  title: {
    color: '#0B2F9F', // Dark blue for title
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    color: '#000', // Black for subtitle
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
    color: '#000', // Dark blue text for inputs
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
    color: '#FFF', // White text for button
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#000', // Black for footer text
    marginTop: 20,
    fontSize: 14,
  },
  signupText: {
    color: '#4379F2', // Purple for signup text
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});