import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useLocationTracker } from "./src/features/tracking/useLocationTracker";

export default function App() {
  const { location, errorMsg } = useLocationTracker();

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.text}>GPS ma'lumotlari yuklanmoqda...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TrackCast 🛰️</Text>
      <View style={styles.infoBox}>
        <Text style={styles.text}>Kenglik: {location.coords.latitude}</Text>
        <Text style={styles.text}>Uzunlik: {location.coords.longitude}</Text>
        <Text style={styles.text}>
          Tezlik: {location.coords.speed ?? 0} m/s
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: "#1A1A1A",
    padding: 20,
    borderRadius: 15,
    width: "100%",
  },
  text: {
    color: "#ccc",
    fontSize: 16,
    marginVertical: 5,
  },
  errorText: {
    color: "#FF5252",
    fontSize: 16,
    textAlign: "center",
  },
});
