import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ReminderDisplay = () => {
  const handleEdit = () => {
    console.log("Edit Reminder");
  };

  const handleDelete = () => {
    console.log("Delete Reminder");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reminder Details</Text>

      {/* Reminder Information Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Reminder Detail</Text>
        <Text style={styles.detail}>
          <Text style={styles.label}>Name:</Text> Rohimat
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.label}>Date:</Text> 2024-12-15
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.label}>Time:</Text> 10:00 AM
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.label}>Notes:</Text> Visit Dr. Smith at City Hospital for a routine check-up.
        </Text>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Ionicons name="create-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  card: {
    backgroundColor: "#E3F2FD",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
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
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4379F2",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    justifyContent: "center",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF5252",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default ReminderDisplay;
