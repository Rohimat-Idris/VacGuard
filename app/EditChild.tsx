import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';

const EditChild = () => {
  const { childId } = useLocalSearchParams(); 
  const [childData, setChildData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const [childName, setChildName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('');
  const [date, setDate] = useState<Date | null>(null);
  const [country, setCountry] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [placeOfBirth, setPlaceOfBirth] = useState<string>('');
  const [guardianName, setGuardianName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [bloodGroup, setBloodGroup] = useState<string>('');
  const [genotype, setGenotype] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');

  useEffect(() => {
    if (childId) {
      setIsLoading(true);
      fetch(`http://192.168.0.2/vaxkids/children/child_profile.php?child_id=${childId}`)
        .then((response) => response.json())
        .then((data) => {
          setChildData(data);
          setChildName(data.child_name);
          setUserName(data.username);
          setGender(data.gender);
          setRelationship(data.relationship);
          setDate(new Date(data.dob));
          setCountry(data.country);
          setState(data.state_of_origin);
          setPlaceOfBirth(data.place_of_birth);
          setGuardianName(data.guardian_name);
          setAddress(data.address);
          setBloodGroup(data.blood_group);
          setGenotype(data.genotype);
          setHeight(data.height);
          setWeight(data.weight.toString());
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching child data:', error);
          setIsLoading(false);
        });
    }
  }, [childId]);

  const updateChild = () => {
    setIsLoading(true);
    const updatedData = {
      child_id: childId,
      child_name: childName,
      username: userName,
      gender: gender,
      relationship: relationship,
      dob: date?.toISOString().split('T')[0],
      country: country,
      state_of_origin: state,
      place_of_birth: placeOfBirth,
      guardian_name: guardianName,
      address: address,
      blood_group: bloodGroup,
      genotype: genotype,
      height: height,
      weight: weight,
    };

    fetch('http://192.168.0.2/vaxkids/children/update_child.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          alert('Child profile updated successfully');
          router.push('/ChildrenList');
        } else {
          alert(`Failed to update child profile: ${data.message || 'Unknown error'}`);
        }
      })
      .catch((error) => {
        console.error('Error updating child profile:', error);
        alert('An error occurred while updating the profile. Please try again.');
      })
      .finally(() => setIsLoading(false));
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#4379F2" style={styles.loader} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Edit Child Profile</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Child Name:</Text>
        <TextInput 
          value={childName} 
          onChangeText={setChildName} 
          style={styles.input} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>User Name:</Text>
        <TextInput 
          value={userName} 
          onChangeText={setUserName} 
          style={styles.input} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender:</Text>
        <TextInput 
          value={gender} 
          onChangeText={setGender} 
          style={styles.input} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Relationship:</Text>
        <TextInput 
          value={relationship} 
          onChangeText={setRelationship} 
          style={styles.input} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date of Birth:</Text>
        <TextInput 
          value={date ? date.toLocaleDateString() : ''} 
          style={styles.input} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Country:</Text>
        <TextInput 
          value={country} 
          onChangeText={setCountry} 
          style={styles.input} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>State:</Text>
        <TextInput 
          value={state} 
          onChangeText={setState} 
          style={styles.input} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Place of Birth:</Text>
        <TextInput 
          value={placeOfBirth} 
          onChangeText={setPlaceOfBirth} 
          style={styles.input} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Guardian Name:</Text>
        <TextInput 
          value={guardianName} 
          onChangeText={setGuardianName} 
          style={styles.input} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Address:</Text>
        <TextInput 
          value={address} 
          onChangeText={setAddress} 
          style={styles.input} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Blood Group:</Text>
        <TextInput 
          value={bloodGroup} 
          onChangeText={setBloodGroup} 
          style={styles.input} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Genotype:</Text>
        <TextInput 
          value={genotype} 
          onChangeText={setGenotype} 
          style={styles.input} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Height:</Text>
        <TextInput 
          value={height} 
          onChangeText={setHeight} 
          style={styles.input} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Weight:</Text>
        <TextInput 
          value={weight} 
          onChangeText={setWeight} 
          style={styles.input} 
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={updateChild}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B2F9F',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    color: '#333',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: '#f9f9f9',
  },
  inputGroup: {
    marginBottom: 0,
  },
  button: {
    backgroundColor: '#0B2F9F',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditChild;
