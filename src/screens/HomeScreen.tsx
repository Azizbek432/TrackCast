import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { useLocationTracker } from "../features/tracking/useLocationTracker";
import { useTrackingStore } from "../features/tracking/trackingStore";
import { Loader } from "../components/Loader";
import { MapComponent } from "../components/MapComponent";

export const HomeScreen = () => {
  const { location, errorMsg } = useLocationTracker();
  const {
    updateLocation,
    distance,
    isRecording,
    startRecording,
    stopRecording,
  } = useTrackingStore();

  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (location && isRecording) {
      updateLocation(location.coords.latitude, location.coords.longitude);
    }
  }, [location, isRecording]);

  if (!location && !errorMsg) {
    return <Loader />;
  }

  const speedMs = location?.coords.speed ?? 0;
  const speedKmh = Math.max(0, speedMs * 3.6).toFixed(1);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.brand}>{showMap ? "MAP VIEW" : "TRACKCAST"}</Text>
        <Image
          source={require("../../assets/TrackCast_logo.png")}
          style={styles.logoIcon}
        />
      </View>
      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : (
        <View style={styles.mainVisual}>
          {showMap ? (
            <MapComponent location={location} />
          ) : (
            <>
              <Image
                source={require("../../assets/speedometer.png")}
                style={[styles.speedBg, { opacity: 0.2 }]}
              />
              <View style={styles.speedTextContainer}>
                <Text style={styles.speedValue}>{speedKmh}</Text>
                <Text style={styles.unit}>km/h</Text>
              </View>

              <View style={styles.distanceContainer}>
                <Text style={styles.distanceLabel}>DISTANCE</Text>
                <Text style={styles.distanceValue}>
                  {(distance / 1000).toFixed(2)}{" "}
                  <Text style={styles.distUnit}>km</Text>
                </Text>
              </View>
            </>
          )}
        </View>
      )}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.mapBtn, showMap && { backgroundColor: "#00ff00" }]}
          onPress={() => setShowMap(!showMap)}
        >
          <Image
            source={require("../../assets/location-pin.png")}
            style={[styles.smallIcon, showMap && { tintColor: "#000" }]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.recordBtn, isRecording && styles.recordingActive]}
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Image
            source={require("../../assets/circle.png")}
            style={[styles.recIcon, isRecording && { tintColor: "#ff0000" }]}
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
    marginBottom: 20,
  },
  brand: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 2,
  },
  logoIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    resizeMode: "contain",
  },
  mainVisual: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    width: "100%",
  },
  speedBg: {
    position: "absolute",
    width: 320,
    height: 320,
  },
  speedTextContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  speedValue: {
    color: "#fff",
    fontSize: 110,
    fontWeight: "bold",
  },
  unit: {
    color: "#00ff00",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: -15,
  },
  distanceContainer: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  distanceLabel: {
    color: "#666",
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 5,
  },
  distanceValue: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "600",
  },
  distUnit: {
    fontSize: 16,
    color: "#00ff00",
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
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#00ff00",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  recordingActive: {
    borderColor: "#ff0000",
    borderWidth: 2,
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
    fontSize: 16,
  },
});
