import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import db from "../database/db";

const HistoryScreen = () => {
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    const data = db.getAllSync("SELECT * FROM trips ORDER BY id DESC");
    setTrips(data);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip History</Text>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>{item.date}</Text>
            <View style={styles.statsRow}>
              <View>
                <Text style={styles.label}>Distance</Text>
                <Text style={styles.value}>
                  {(item.distance / 1000).toFixed(2)} km
                </Text>
              </View>
              <View>
                <Text style={styles.label}>Max Speed</Text>
                <Text style={styles.value}>
                  {Math.round(item.maxSpeed)} km/h
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
  },
  card: {
    backgroundColor: "#1a1a1a",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#00FF00",
  },
  date: { color: "#888", marginBottom: 10 },
  statsRow: { flexDirection: "row", justifyContent: "space-between" },
  label: { color: "#666", fontSize: 12 },
  value: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default HistoryScreen;
