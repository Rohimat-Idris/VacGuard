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
import { LinearGradient } from 'expo-linear-gradient'; 
import { useRouter } from 'expo-router';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [buttonAnimation] = useState(new Animated.Value(1));
  const router = useRouter();

  const handlePasswordReset = () => {
    if (email) {
      alert('Password reset link has been sent to your email.');
      router.push('/');  
    } else {
      alert('Please enter a valid email address.');
    }
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
    ]).start(handlePasswordReset);
  };

  return (
    <LinearGradient colors={['#fff', '#efefef']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <View style={styles.header}>
          <Ionicons
            name="lock-closed-outline"
            size={80}
            color="#0B2F9F"
            style={{ marginVertical: 10 }}
          />
          <Text style={styles.companyName}>VaxGuard</Text>
          <Text style={styles.slogan}>Secure your Account</Text>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Enter your email to receive a password reset link.
          </Text>
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
            <Text style={styles.buttonText}>Send Reset Link</Text>
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.backToLogin}>
          <Text style={styles.backToLoginText}>Back to Login</Text>
        </TouchableOpacity>
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
    color: '#0B2F9F',
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
    color: '#0B2F9F',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
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
  backToLogin: {
    marginTop: 20,
  },
  backToLoginText: {
    color: '#0B2F9F',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
