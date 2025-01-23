import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { router } from 'expo-router';

const AddChildProfile: React.FC = () => {
  const [childName, setChildName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [gender, setGender] = useState<string>('Female');
  const [relationship, setRelationship] = useState<string>('Mother');
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [country, setCountry] = useState<string>('Nigeria');
  const [state, setState] = useState<string>('Kogi');
  const [placeOfBirth, setPlaceOfBirth] = useState<string>('Hospital');
  const [guardianName, setGuardianName] = useState<string>('Guardian');
  const [address, setAddress] = useState<string>('');
  const [bloodGroup, setBloodGroup] = useState<string>('O+');
  const [genotype, setGenotype] = useState<string>('AA');
  const [height, setHeight] = useState<string>(''); // Baby height in cm
  const [weight, setWeight] = useState<string>(''); // Baby weight in kg

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleSubmit = async () => {
    const formData = {
      child_name: childName,
      gender,
      relationship,
      dob: date.toISOString().split('T')[0],
      height,
      weight,
      blood_group: bloodGroup,
      genotype: genotype,
      state_of_origin: state,
      place_of_birth: placeOfBirth,
      guardian_name: guardianName,
      address,
      country,
      username: userName,
    };
  
    if (!childName || !userName || !height || !weight || !guardianName || !address) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
  
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    if (!usernamePattern.test(userName)) {
      Alert.alert('Error', 'Username must contain only alphanumeric characters.');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.0.2/vaxkids/children/addChild.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (data.success) {
        const childId =data.child.id
        Alert.alert('Success', data.message);
  
        // Assuming `data.childId` is returned by the backend as the new child's ID
        router.push({ pathname: '/ViewDetail', params: { childId: childId } });
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add child profile');
    }
  };
  
  

  return (
    <View style={styles.container}>
      {/* Static profile image container */}
      <View style={styles.profileImageContainer}>
        <Ionicons
          name="person-circle-outline"
          size={100}
          color="#0B2F9F"
          style={styles.profileIcon}
        />
      </View>

      {/* Scrollable content */}
      <ScrollView style={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Child's Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Full Name"
            placeholderTextColor="#888"
            value={childName}
            onChangeText={setChildName}
          />

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Child's Username"
            placeholderTextColor="#888"
            value={userName}
            onChangeText={setUserName}
          />

          <View style={styles.pickerContainer}>
            <View style={styles.pickerWrapper}>
              <Text style={styles.label}>Gender</Text>
              <Picker
                selectedValue={gender}
                style={styles.picker}
                onValueChange={(itemValue) => setGender(itemValue)}
              >
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Male" value="Male" />
              </Picker>
            </View>

            <View style={styles.pickerWrapper}>
              <Text style={styles.label}>Relationship</Text>
              <Picker
                selectedValue={relationship}
                style={styles.picker}
                onValueChange={(itemValue) => setRelationship(itemValue)}
              >
                <Picker.Item label="Mother" value="Mother" />
                <Picker.Item label="Father" value="Father" />
                <Picker.Item label="Guardian" value="Guardian" />
              </Picker>
            </View>
          </View>

          <View style={styles.dateContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity onPress={showDatepicker} style={styles.dateInput}>
              <Text>{date.toLocaleDateString()}</Text>
              <Icon name="calendar" size={20} color="#888" style={styles.dateIcon} />
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode={'date'}
              display="default"
              onChange={onChangeDate}
            />
          )}

          <Text style={styles.label}>Place of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="Hospital/Home"
            placeholderTextColor="#888"
            value={placeOfBirth}
            onChangeText={setPlaceOfBirth}
          />

          <Text style={styles.label}>Guardian Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Guardian Name"
            placeholderTextColor="#888"
            value={guardianName}
            onChangeText={setGuardianName}
          />

          <View style={styles.pickerContainer}>
            <View style={styles.pickerWrapper}>
              <Text style={styles.label}>Country</Text>
              <Picker
                selectedValue={country}
                style={styles.picker}
                onValueChange={(itemValue) => setCountry(itemValue)}
              >
                <Picker.Item label="Nigeria" value="Nigeria" />
              </Picker>
            </View>

            <View style={styles.pickerWrapper}>
              <Text style={styles.label}>State Of Origin</Text>
              <Picker
                selectedValue={state}
                style={styles.picker}
                onValueChange={(itemValue) => setState(itemValue)}
              >
              <Picker.Item label="Abia" value="Abia" />
              <Picker.Item label="Adamawa" value="Adamawa" />
              <Picker.Item label="Akwa Ibom" value="Akwa Ibom" />
              <Picker.Item label="Anambra" value="Anambra" />
              <Picker.Item label="Bauchi" value="Bauchi" />
              <Picker.Item label="Bayelsa" value="Bayelsa" />
              <Picker.Item label="Benue" value="Benue" />
              <Picker.Item label="Borno" value="Borno" />
              <Picker.Item label="Cross River" value="Cross River" />
              <Picker.Item label="Delta" value="Delta" />
              <Picker.Item label="Ebonyi" value="Ebonyi" />
              <Picker.Item label="Edo" value="Edo" />
              <Picker.Item label="Ekiti" value="Ekiti" />
              <Picker.Item label="Enugu" value="Enugu" />
              <Picker.Item label="Gombe" value="Gombe" />
              <Picker.Item label="Imo" value="Imo" />
              <Picker.Item label="Jigawa" value="Jigawa" />
              <Picker.Item label="Kaduna" value="Kaduna" />
              <Picker.Item label="Kano" value="Kano" />
              <Picker.Item label="Katsina" value="Katsina" />
              <Picker.Item label="Kebbi" value="Kebbi" />
              <Picker.Item label="Kogi" value="Kogi" />
              <Picker.Item label="Kwara" value="Kwara" />
              <Picker.Item label="Lagos" value="Lagos" />
              <Picker.Item label="Nasarawa" value="Nasarawa" />
              <Picker.Item label="Niger" value="Niger" />
              <Picker.Item label="Ogun" value="Ogun" />
              <Picker.Item label="Ondo" value="Ondo" />
              <Picker.Item label="Osun" value="Osun" />
              <Picker.Item label="Oyo" value="Oyo" />
              <Picker.Item label="Plateau" value="Plateau" />
              <Picker.Item label="Rivers" value="Rivers" />
              <Picker.Item label="Sokoto" value="Sokoto" />
              <Picker.Item label="Taraba" value="Taraba" />
              <Picker.Item label="Yobe" value="Yobe" />
              <Picker.Item label="Zamfara" value="Zamfara" />
              <Picker.Item label="FCT (Abuja)" value="FCT" />
              </Picker>
            </View>
          </View>

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter address"
            placeholderTextColor="#888"
            value={address}
            onChangeText={setAddress}
          />

          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Height (cm)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter height"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter weight"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
              />
            </View>
          </View>

          <View style={styles.pickerContainer}>
            <View style={styles.pickerWrapper}>
              <Text style={styles.label}>Blood Group</Text>
              <Picker
                selectedValue={bloodGroup}
                style={styles.picker}
                onValueChange={(itemValue) => setBloodGroup(itemValue)}
              >
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
              </Picker>
            </View>
          </View>
          <View style={styles.pickerContainer}>
            <View style={styles.pickerWrapper}>
              <Text style={styles.label}>Genotype</Text>
              <Picker
                selectedValue={genotype}
                style={styles.picker}
                onValueChange={(itemValue) => setGenotype(itemValue)}
              >
              <Picker.Item label="AA" value="AA" />
              <Picker.Item label="AS" value="AS" />
              <Picker.Item label="SS" value="SS" />
              <Picker.Item label="AC" value="AC" />
              <Picker.Item label="SC" value="SC" />
              </Picker>
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>
              Add child
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddChildProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileImageContainer: {
    alignItems: 'center',
    backgroundColor: '#4379F2',
    padding: 20,
    position: 'absolute', // Keep it static
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Ensure it's on top of the scrollable content
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: 180, // Adjust height as needed for image size
  },
  profileIcon: {
    width: 100,
    height: 100,
  },
  scrollContent: {
    paddingHorizontal: 20,
    marginTop: 190,
  },
  formContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  pickerWrapper: {
    flex: 1,
    marginRight: 10,
  },
  picker: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  dateContainer: {
    marginBottom: 15,
  },
  dateInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateIcon: {
    marginLeft: 10,
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#0B2F9F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
