import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient background
import { MaterialIcons } from '@expo/vector-icons'; // Additional icon set for a more captivating look
import { router } from 'expo-router';

const Setting = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [themeColor, setThemeColor] = useState('#0B2F9F'); // Default theme color

  const handleThemeChange = (color: string) => {
    setThemeColor(color);
  };

  return (
    <LinearGradient
      colors={darkModeEnabled ? ['#000000', '#333333'] : [themeColor, '#f2f2f2']} // Adjusting gradient for light mode
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.headerText, { color: darkModeEnabled ? '#fff' : themeColor }]}>Settings</Text>

        {/* Notifications Toggle Card */}
        <View style={styles.settingCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="notifications-active" size={30} color={themeColor} />
            <Text style={[styles.settingText, { color: themeColor }]}>Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
            thumbColor={notificationsEnabled ? themeColor : '#f4f3f4'}
            trackColor={{ false: '#767577', true: themeColor }}
          />
        </View>

        {/* Dark Mode Toggle Card */}
        <View style={styles.settingCard}>
          <View style={styles.cardContent}>
            <Ionicons name="moon" size={30} color={themeColor} />
            <Text style={[styles.settingText, { color: themeColor }]}>Dark Mode</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={() => setDarkModeEnabled(!darkModeEnabled)}
            thumbColor={darkModeEnabled ? '#FFF' : themeColor}
            trackColor={{ false: '#767577', true: themeColor }}
          />
        </View>

        {/* Theme Color Picker */}
        <View style={styles.settingCard}>
          <View style={styles.cardContent}>
            <Ionicons name="color-palette" size={30} color={themeColor} />
            <Text style={[styles.settingText, { color: themeColor }]}>Theme Color</Text>
          </View>
          <View style={styles.colorOptions}>
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: '#0B2F9F' }]}
              onPress={() => handleThemeChange('#0B2F9F')}
            />
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: '#FF6F61' }]}
              onPress={() => handleThemeChange('#FF6F61')}
            />
            <TouchableOpacity
              style={[styles.colorOption, { backgroundColor: '#28A745' }]}
              onPress={() => handleThemeChange('#28A745')}
            />
          </View>
        </View>

        {/* Other Settings Options */}
        <TouchableOpacity style={styles.settingCard}>
          <View style={styles.cardContent}>
            <Ionicons name="lock-closed" size={30} color={themeColor} />
            <Text style={[styles.settingText, { color: themeColor }]}>Privacy Settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={themeColor} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingCard}>
          <View style={styles.cardContent}>
            <MaterialIcons name="language" size={30} color={themeColor} />
            <Text style={[styles.settingText, { color: themeColor }]}>Language</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={themeColor} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingCard} onPress={()=>router.push('/ChangePassword')}>
          <View style={styles.cardContent}>
            <Ionicons name="key" size={30} color={themeColor} />
            <Text style={[styles.settingText, { color: themeColor }]}>Change Password</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={themeColor} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingCard}>
          <View style={styles.cardContent}>
            <Ionicons name="help-circle" size={30} color={themeColor} />
            <Text style={[styles.settingText, { color: themeColor }]}>Help and Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={themeColor} />
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={styles.settingCard} onPress={()=>router.push('/Login')}>
          <View style={styles.cardContent}>
            <Ionicons name="log-out" size={30} color={themeColor}  />
            <Text style={[styles.settingText, { color: themeColor }]}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  settingCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 15,
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
  },
});

export default Setting;
