import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const MOCK_HISTORY = [
  { id: "1", date: "21.04.2026", dist: "5.2 km", speed: "12 km/h" },
  { id: "2", date: "20.04.2026", dist: "3.1 km", speed: "10 km/h" },
];

export const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY TRACKS</Text>
      <FlatList
        data={MOCK_HISTORY}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>{item.date}</Text>
            <View style={styles.stats}>
              <Text style={styles.statText}>Dist: {item.dist}</Text>
              <Text style={styles.statText}>Avg: {item.speed}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20, paddingTop: 60 },
  title: { color: "#fff", fontSize: 24, fontWeight: "900", marginBottom: 20 },
  card: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  date: { color: "#00ff00", fontWeight: "bold", marginBottom: 5 },
  stats: { flexDirection: "row", justifyContent: "space-between" },
  statText: { color: "#fff", fontSize: 16 },
});
