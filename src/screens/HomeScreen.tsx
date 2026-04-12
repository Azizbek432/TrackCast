import React from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { useLocationTracker } from "../features/tracking/useLocationTracker";

export const HomeScreen = () => {
  const { location, errorMsg } = useLocationTracker();

  const speedMs = location?.coords.speed ?? 0;
  const speedKmh = Math.max(0, speedMs * 3.6).toFixed(1);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.brand}>TRACKCAST</Text>
        <Image
          source={require("../../assets/speedometer.png")}
          style={styles.logoIcon}
        />
      </View>

      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : (
        <View style={styles.mainVisual}>
          <Image
            source={require("../../assets/speedometer.png")}
            style={[styles.speedBg, { opacity: 0.3 }]}
          />
          <View style={styles.speedTextContainer}>
            <Text style={styles.speedValue}>{speedKmh}</Text>
            <Text style={styles.unit}>km/h</Text>
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.mapBtn}>
          <Image
            source={require("../../assets/location-pin.png")}
            style={styles.smallIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.recordBtn}>
          <Image
            source={require("../../assets/circle.png")}
            style={styles.recIcon}
          />
        </TouchableOpacity>

        <View style={styles.placeholder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 25,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 2,
  },
  logoIcon: {
    width: 40,
    height: 40,
  },
  mainVisual: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  speedBg: {
    position: "absolute",
    width: 300,
    height: 300,
  },
  speedTextContainer: {
    alignItems: "center",
  },
  speedValue: {
    color: "#fff",
    fontSize: 100,
    fontWeight: "bold",
  },
  unit: {
    color: "#00ff00",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  mapBtn: {
    backgroundColor: "#1A1A1A",
    padding: 15,
    borderRadius: 20,
  },
  smallIcon: {
    width: 30,
    height: 30,
  },
  recordBtn: {
    backgroundColor: "#fff",
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  recIcon: {
    width: 60,
    height: 60,
  },
  placeholder: {
    width: 60,
  },
  errorText: {
    color: "#ff4444",
    textAlign: "center",
    marginTop: 50,
  },
});
