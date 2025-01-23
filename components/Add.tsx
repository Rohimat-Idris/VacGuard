import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Picker,
  Image,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const AddChildProfile = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Female');
  const [relation, setRelation] = useState('Mother');
  const [dob, setDob] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <FontAwesomeIcon icon={faArrowLeft} size={20} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Add Your Child's Profile</Text>

      <View style={styles.profileImageContainer}>
        <FontAwesomeIcon icon={faCamera} size={20} color="#000" style={styles.cameraIcon} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Child's Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Full Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Male" value="Male" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Relation with Child</Text>
        <Picker
          selectedValue={relation}
          onValueChange={(itemValue) => setRelation(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Mother" value="Mother" />
          <Picker.Item label="Father" value="Father" />
          <Picker.Item label="Guardian" value="Guardian" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="dd/mm/yy"
          value={dob}
          onChangeText={setDob}
          keyboardType="number-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          placeholder="0 cm"
          value={height}
          onChangeText={setHeight}
          keyboardType="number-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="0 kg"
          value={weight}
          onChangeText={setWeight}
          keyboardType="number-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Blood Group</Text>
        <Picker
          selectedValue={bloodGroup}
          onValueChange={(itemValue) => setBloodGroup(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="O+" value="O+" />
          <Picker.Item label="A+" value="A+" />
          <Picker.Item label="B+" value="B+" />
          <Picker.Item label="AB+" value="AB+" />
          <Picker.Item label="O-" value="O-" />
          <Picker.Item label="A-" value="A-" />
          <Picker.Item label="B-" value="B-" />
          <Picker.Item label="AB-" value="AB-" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>Create Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  createButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddChildProfile;