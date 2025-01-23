import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

interface ChildrenListProps {
  parentId: number;
}

interface Child {
  child_id: number;
  child_name: string;
  dob: string;
} 

const AddRecord: React.FC<ChildrenListProps> = ({ parentId }) => {
  const [childrenOptions, setChildrenOptions] = useState<{ label: string; value: number }[]>([]);
  const [selectedChild, setSelectedChild] = useState<SelectedChild>(null);
  const [selectedVaccine, setSelectedVaccine] = useState<string | undefined>(undefined);
  const [age, setAge] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const vaccineOptions = ["BCG", "Polio", "DTP", "PCV", "RV", "Yellow Fever", "Measles", "Meningitis", "MMR", "Hepatitis B"];
  const ageOptions = ["At Birth", "6 Weeks", "10 Weeks", "14 Weeks", "9 Months", "15 Months", "18 Months", "2 Years"];

  useEffect(() => {
    fetch(`http://192.168.0.2/vaxkids/children/parentJoin.php?parent_id=${parentId}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          Alert.alert("Error", data.error);
        } else {
          const children = data.children.map((child: Child) => ({
            label: child.child_name,
            value: child.child_id,
            child_name: child.child_name, // Store name for submission
          }));
          setChildrenOptions(children);
        }
      })
      .catch(error => {
        console.error("Error fetching children:", error);
        Alert.alert("Error", "Unable to fetch children data.");
      });
  }, [parentId]);
  

  const handleDateChange = (event: any, selectedDate?: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  type SelectedChild = {
    value: number;
    child_name: string;
  } | null;
  
  const saveReminder = async () => {
    if (!selectedChild || !selectedVaccine || !age) {
      Alert.alert('Error', 'Please fill all fields before saving.');
      return;
    }
  
    const reminderData = {
      child_id: selectedChild.value, // Submitting the ID
      child_name: selectedChild.child_name, // Submitting the name
      vaccine: selectedVaccine,
      date: date.toISOString().split('T')[0],
      age: age,
    };
  
    try {
      const response = await fetch('http://192.168.0.2/vaxkids/children/records.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reminderData),
      });
    
      const text = await response.text();
      console.log("Raw Response:", text);
    
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        Alert.alert('Error', 'Invalid server response.');
        return;
      }
    
      if (data.success || data.message.includes('successfully')) {
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred';
    
      if (error instanceof Error) {
        errorMessage = error.message;
      }
    
      console.error('Error:', error);
      Alert.alert('Error', `Failed to save reminder: ${errorMessage}`);
    }
    
  };
  

  return (
    <View style={styles.container}>
      {/* Static Header Section */}
      <Text style={styles.header}>Add a Friendly Record!</Text>
      <Text style={styles.description}>Keep record vaccine for your little one!</Text>
      
      {/* Scrollable Content Section */}
      <ScrollView style={styles.scrollContainer}>
      <View style={styles.field}>
      <Text style={styles.label}>Select Child</Text>
      <Picker
        selectedValue={selectedChild?.value || null}
        onValueChange={(itemValue) => {
          const selected = childrenOptions.find(child => child.value === itemValue);
          setSelectedChild(selected ? { value: selected.value, child_name: selected.label } : null);
        }}
        style={styles.picker}
      >
        <Picker.Item label="Select Child" value={null} />
        {childrenOptions.map((child, index) => (
          <Picker.Item key={index} label={child.label} value={child.value} />
        ))}
      </Picker>

    </View>

        <View style={styles.field}>
          <Text style={styles.label}>Vaccine</Text>
          <Picker
            selectedValue={selectedVaccine}
            onValueChange={(itemValue) => setSelectedVaccine(itemValue as string)}
            style={styles.picker}
          >
            <Picker.Item label="Select Vaccine" value={null} />
            {vaccineOptions.map((vaccine, index) => (
              <Picker.Item key={index} label={vaccine} value={vaccine} />
            ))}
          </Picker>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Age</Text>
          <Picker
            selectedValue={age}
            onValueChange={(itemValue) => setAge(itemValue as string)}
            style={styles.picker}
          >
            <Picker.Item label="Select Age" value={null} />
            {ageOptions.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Set Date</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
            <Text style={styles.dateText}>{date.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveReminder}>
          <Text style={styles.saveButtonText}>Save Record</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#0b2f9f',
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#4379F2',
    marginBottom: 8,
  },
  picker: {
    backgroundColor: '#efefef',
    borderRadius: 8,
    height: 45,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  dateButton: {
    paddingVertical: 12,
    backgroundColor: '#efefef',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  dateText: {
    fontSize: 16,
    color: '#0b2f9f',
  },
  messageInput: {
    padding: 10,
    backgroundColor: '#efefef',
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#0b2f9f',
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4379F2',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddRecord;