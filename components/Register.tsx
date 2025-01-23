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
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buttonAnimation] = useState(new Animated.Value(1));

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Registration button pressed');
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
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        {/* Header with Company Information */}
        <View style={styles.header}>
          <Text style={styles.title}>VaxGuard</Text>
          <Text style={styles.subtitle}>Your ultimate companion</Text>
          <Ionicons name="shield-checkmark-outline" 
          size={80}
          color="#0B2F9F"
          style={{ marginVertical: 10 }}
           />
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#0B2F9F"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
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
            <Text style={styles.buttonText}>Register</Text>
          </Animated.View>
        </TouchableOpacity>

        {/* Footer for Navigation to Login */}
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text
            style={styles.loginText}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            Login
          </Text>
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Dominant white background
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
  },
  subtitle: {
    color: '#4379F2', // Purple for slogan
    fontSize: 12,
    marginTop: 1,
    marginBottom: 4,
    fontStyle: 'italic',
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
    backgroundColor: '#0B2F9F', // Primary button color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF', // White text for buttons
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#000',
    marginTop: 20,
    fontSize: 14,
  },
  loginText: {
    color: '#4379F2',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
});
