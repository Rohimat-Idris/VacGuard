import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const ViewDetail: React.FC = () => {
  const [childData, setChildData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const { childId } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchChildData = async () => {
      try {
        const response = await fetch('http://192.168.0.2/vaxkids/children/viewChild.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: childId }),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        if (!data || !data.child_name) throw new Error('Child data not found');

        setChildData(data);
      } catch (error) {
        console.error('Failed to fetch child data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChildData();
  }, [childId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0B2F9F" style={styles.loading} />;
  }

  if (!childData) {
    return <Text style={styles.errorText}>Child data not found</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Static Welcome Banner */}
      <View style={styles.welcomeBanner}>
        <Text style={styles.welcomeText}>Welcome to VacGuard, {childData.username}!</Text>
        <Text style={styles.subHeading}>Your ultimate companion on the journey to a healthier future.</Text>
        <Text style={styles.description}>
          Here at VacGuard, we’re dedicated to ensuring {childData.child_name}'s vaccination journey is seamless and stress-free. Explore important updates, view schedules, and stay informed — all in one place.
        </Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.card}>
          <Text style={styles.heading}>Your Child Information</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Name: <Text style={styles.infoText}>{childData.child_name}</Text></Text>
            <Text style={styles.label}>Gender: <Text style={styles.infoText}>{childData.gender}</Text></Text>
            <Text style={styles.label}>Date of Birth: <Text style={styles.infoText}>{childData.dob}</Text></Text>

            {/* Conditionally Rendered Details */}
            {showMore && (
              <>
                <Text style={styles.label}>Blood Group: <Text style={styles.infoText}>{childData.blood_group}</Text></Text>
                <Text style={styles.label}>Genotype: <Text style={styles.infoText}>{childData.genotype}</Text></Text>
                <Text style={styles.label}>Height: <Text style={styles.infoText}>{childData.height} cm</Text></Text>
                <Text style={styles.label}>Weight: <Text style={styles.infoText}>{childData.weight} kg</Text></Text>
                <Text style={styles.label}>Guardian Name: <Text style={styles.infoText}>{childData.guardian_name}</Text></Text>
                <Text style={styles.label}>Country: <Text style={styles.infoText}>{childData.country}</Text></Text>
                <Text style={styles.label}>State of Origin: <Text style={styles.infoText}>{childData.state_of_origin}</Text></Text>
                <Text style={styles.label}>Address: <Text style={styles.infoText}>{childData.address}</Text></Text>
              </>
            )}

            {/* Show More Button */}
            <TouchableOpacity style={styles.showMoreButton} onPress={() => setShowMore(!showMore)}>
              <Text style={styles.showMoreButtonText}>{showMore ? 'Show Less' : 'Show More Details'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dashboard Navigation Button */}
              <TouchableOpacity
        style={styles.dashboardButton}
        onPress={() => router.push({ pathname: '/ChildrenList', params: { childData: JSON.stringify(childData) } })}
      >
        <Text style={styles.dashboardButtonText}>View Child</Text>
      </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default ViewDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  welcomeBanner: {
    padding: 25,
    backgroundColor: '#0B2F9F',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 21,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
  },
  subHeading: {
    fontSize: 12,
    color: '#d1d8e0',
    textAlign: 'center',
    marginTop: 5,
  },
  description: {
    fontSize: 9,
    color: '#d1d8e0',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  scrollContent: {
    flex: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 20,
  },
  heading: {
    fontSize: 19,
    fontWeight: '700',
    color: '#0B2F9F',
    textAlign: 'center',
    marginBottom: 15,
  },
  infoContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A4A',
    marginBottom: 8,
  },
  infoText: {
    fontWeight: '400',
    color: '#333333',
  },
  showMoreButton: {
    backgroundColor: '#0B2F9F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 15,
  },
  showMoreButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
  },
  dashboardButton: {
    backgroundColor: '#0B2F9F',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 15,
  },
  dashboardButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
