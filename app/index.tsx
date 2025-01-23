import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();  

  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);
  const rotateAnim = new Animated.Value(0);

  useEffect(() => {
    // Fade in, scale up, and rotate animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 360,
        duration: 2000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/Login');  
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, rotateAnim, router]);

  // Rotate animation
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFF', '#FFF']}
        style={StyleSheet.absoluteFillObject}
      />
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }, { rotate: rotateInterpolate }] }]}>
        <Text style={styles.companyName}>VacGuard</Text>
        <Text style={styles.slogan}>Your Ultimate Companion</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 5,
    fontStyle: 'italic',
  },
});
