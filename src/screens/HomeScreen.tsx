import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useLocationTracker } from "../features/tracking/useLocationTracker";
import { useTrackingStore } from "../features/tracking/trackingStore";
import { Loader } from "../components/Loader";
import { MapComponent } from "../components/MapComponent";

export const HomeScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
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
    // location mavjudligini va isRecording holatini tekshiramiz
    if (location?.coords && isRecording) {
      updateLocation(location.coords.latitude, location.coords.longitude);
    }
  }, [location, isRecording]);

  // Agar ruxsatlar hali so'ralmagan bo'lsa
  if (!permission) return <View style={styles.container} />;

  // Loader faqat location va errorMsg bo'lmagandagina chiqishi kerak
  if (!location && !errorMsg) return <Loader />;

  // Tezlikni xavfsiz hisoblash
  const speedKmh = location?.coords?.speed
    ? Math.max(0, location.coords.speed * 3.6).toFixed(1)
    : "0.0";

  const handleRecordPress = async () => {
    if (!isRecording) {
      // Kamera ruxsatini tekshirish
      if (!permission.granted) {
        const { status } = await requestPermission();
        if (status !== "granted") return;
      }
      startRecording();
    } else {
      stopRecording();
      // Sessiyani saqlash
      useTrackingStore.getState().saveSession();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={StyleSheet.absoluteFill}>
        {isRecording && permission.granted ? (
          <CameraView style={StyleSheet.absoluteFill} facing="back" />
        ) : showMap && location ? (
          <MapComponent location={location} />
        ) : (
          <View style={styles.darkBg} />
        )}
      </View>

      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.brand}>
            {isRecording ? "LIVE TRACKING" : "TRACKCAST"}
          </Text>

          <View style={styles.logoContainer}>
            <Image
              // assets papkangizdagi logo nomi bilan bir xil ekanligini tekshiring
              source={require("../../assets/logo.png")}
              style={styles.logoIcon}
            />
          </View>
        </View>

        <View style={styles.mainVisual}>
          <View style={styles.speedTextContainer}>
            <Text
              style={[styles.speedValue, isRecording && styles.arTextShadow]}
            >
              {speedKmh}
            </Text>
            <Text style={styles.unit}>km/h</Text>
          </View>

          <View style={styles.distanceContainer}>
            <Text style={styles.distanceLabel}>DISTANCE</Text>
            <Text style={styles.distanceValue}>
              {(distance / 1000).toFixed(2)}{" "}
              <Text style={styles.distUnit}>km</Text>
            </Text>
          </View>
        </View>

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
            onPress={handleRecordPress}
          >
            <View
              style={[
                styles.recCircle,
                isRecording && { backgroundColor: "#ff0000", borderRadius: 5 },
              ]}
            />
          </TouchableOpacity>

          <View style={styles.placeholder} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  darkBg: { flex: 1, backgroundColor: "#000" },
  overlay: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 50,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  brand: { color: "#fff", fontSize: 22, fontWeight: "900", letterSpacing: 2 },
  logoContainer: {
    width: 55,
    height: 55,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  logoIcon: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  mainVisual: { flex: 1, alignItems: "center", justifyContent: "center" },
  speedTextContainer: { alignItems: "center", marginBottom: 40 },
  speedValue: { color: "#fff", fontSize: 110, fontWeight: "bold" },
  arTextShadow: { textShadowColor: "#00ff00", textShadowRadius: 20 },
  unit: { color: "#00ff00", fontSize: 22, fontWeight: "bold", marginTop: -15 },
  distanceContainer: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  distanceLabel: {
    color: "#aaa",
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 5,
  },
  distanceValue: { color: "#fff", fontSize: 32, fontWeight: "600" },
  distUnit: { fontSize: 16, color: "#00ff00" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  mapBtn: { backgroundColor: "#1A1A1A", padding: 18, borderRadius: 25 },
  smallIcon: { width: 25, height: 25 },
  recordBtn: {
    backgroundColor: "#fff",
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  recordingActive: { borderWidth: 4, borderColor: "#ff0000" },
  recCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#000",
  },
  placeholder: { width: 60 },
});
