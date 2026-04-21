import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { useTrackingStore } from "../features/tracking/trackingStore";

export const HistoryScreen = () => {
  const { history } = useTrackingStore();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.time}>{item.time || "Session"}</Text>
      </View>
      <View style={styles.cardStats}>
        <View>
          <Text style={styles.statLabel}>DISTANCE</Text>
          <Text style={styles.statValue}>
            {item.distance} <Text style={styles.miniUnit}>km</Text>
          </Text>
        </View>
        <View style={styles.divider} />
        <View>
          <Text style={styles.statLabel}>AVG SPEED</Text>
          <Text style={styles.statValue}>
            {item.avgSpeed || "0.0"} <Text style={styles.miniUnit}>km/h</Text>
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>HISTORY</Text>
        <Image
          source={require("../../assets/TrackCast_logo.png")}
          style={styles.miniLogo}
        />
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No activities yet.</Text>
            <Text style={styles.emptySubText}>
              Start tracking to see your progress!
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", paddingHorizontal: 20 },
  header: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: { color: "#fff", fontSize: 28, fontWeight: "900", letterSpacing: 2 },
  miniLogo: { width: 40, height: 40, borderRadius: 10 },
  list: { paddingBottom: 40 },
  card: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#222",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  date: { color: "#00ff00", fontSize: 14, fontWeight: "bold" },
  time: { color: "#666", fontSize: 14 },
  cardStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statLabel: {
    color: "#555",
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 5,
    textAlign: "center",
  },
  statValue: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  miniUnit: { fontSize: 12, color: "#00ff00" },
  divider: { width: 1, height: 30, backgroundColor: "#333" },
  emptyContainer: { marginTop: 100, alignItems: "center" },
  emptyText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  emptySubText: { color: "#666", marginTop: 10 },
});
