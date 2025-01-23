import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Define types for the reminder
interface Reminder {
  id: number;
  child_name: string;
  alarm_date: string;
  alarm_time: string;
  frequent_time: string;
  personal_note?: string;
}

const ReminderList: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchReminders = async () => {
    try {
        const response = await fetch("http://192.168.0.2/vaxkids/children/call_reminder.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const text = await response.text(); // Get raw text response
        console.log("Raw Response:", text);

        const data = JSON.parse(text); // Parse JSON from the response
        if (data.success) {
            setReminders(data.reminders);
        } else {
            console.warn(data.message);
        }
    } catch (error) {
        console.error("Error fetching reminders:", error);
    }finally {
      setLoading(false); // Ensure loading stops after the fetch
    }
};



  useEffect(() => {
    fetchReminders();
  }, []);

  const renderReminder = ({ item }: { item: Reminder }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.child_name}</Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Date:</Text> {item.alarm_date}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Time:</Text> {item.alarm_time}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Frequency:</Text> {item.frequent_time}
      </Text>
      {item.personal_note && (
        <Text style={styles.detail}>
          <Text style={styles.label}>Notes:</Text> {item.personal_note}
        </Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("Reminder", `Details for ${item.child_name}`)}
      >
        <Ionicons name="information-circle-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4379F2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Reminders</Text>
      {reminders.length > 0 ? (
        <FlatList
          data={reminders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderReminder}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noReminders}>No reminders available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4379F2",
    marginBottom: 20,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#E3F2FD",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0B2F9F",
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    color: "#798645",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    color: "#0B2F9F",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4379F2",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  noReminders: {
    fontSize: 16,
    color: "#798645",
    textAlign: "center",
  },
});

export default ReminderList;
