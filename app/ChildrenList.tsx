import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // For icons

interface Child  {
  child_id: number;
  child_name: string;
  dob: string;
  gender: string;
  state_of_origin: string;
  state: string;
  username: string;
  age: number;
}

interface ChildrenListProps {
  parentId: number;  // Accept parentId as a prop
}

const ChildrenList: React.FC<ChildrenListProps> = ({ parentId }) => {
  const router = useRouter();
  const [children, setChildren] = useState<Child[]>([]);
  const [parentName, setParentName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChildrenData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://192.168.0.2/vaxkids/children/parentJoin.php?parent_id=${parentId}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const text = await response.text();
      console.log(`Response Text: ${text}`);
  
      // Try parsing the JSON response
      const data = JSON.parse(text);
  
      if (data.error) {
        setError(data.error);
      } else {
        setParentName(data.parent_name);
        setChildren(data.children);
      }
    } catch (err) {
      console.log(err);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildrenData();
  }, []);

  const handleChildPress = (child: Child) => {
    router.push({
      pathname: '/Views',
      params: {
        childId: child.child_id.toString(), // Pass child_id as a string
        child: JSON.stringify(child), // Serialize the entire child object
      },
    });
  };
  
  // const handleChildPress = (child: Child) => {
  //   router.push({
  //     pathname: '/Views',
  //     params: { child: JSON.stringify(child) }, // Pass the child object directly
  //   });
  // };
  

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4379F2" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{parentName}'s Children</Text>
      {children.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="sad-outline" size={50} color="#ccc" />
          <Text style={styles.noChildrenText}>No children associated with this parent. Please add a child to get started.</Text>
        </View>
      ) : (
        <FlatList
          data={children}
          keyExtractor={(item) => item.child_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.childItem} onPress={() => handleChildPress(item)}>
              <Text style={styles.childName}>{item.child_name}</Text>
              <Text style={styles.childName}>{item.username}</Text>
              <Text style={styles.childName}>{item.age}</Text>
              <Text style={styles.childDetails}>
                DOB: {new Date(item.dob).toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7', // Light background color
  },
  header: {
    fontSize: 26,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#0B2F9F', // Primary color for headers
    marginBottom: 20,
    textAlign: 'center',
  },
  childItem: {
    padding: 15,
    backgroundColor: '#fff', // Card background color
    borderRadius: 10,
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 15,
  },
  childName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0B2F9F',
  },
  childDetails: {
    fontSize: 16,
    color: '#555',
  },
  noChildrenText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChildrenList;
