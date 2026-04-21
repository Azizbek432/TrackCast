import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useTrackingStore } from "../features/tracking/trackingStore";

const Speedometr = () => {
  const speed = useTrackingStore((state) => state.speed);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/speedometer.png")}
        style={styles.bgImage}
        resizeMode="contain"
      >
        <View style={styles.dataContainer}>
          {/* Tezlikni 1 xonali bo'lsa ham markazda saqlash uchun padding qo'shildi */}
          <Text style={styles.speedText}>{Math.round(speed || 0)}</Text>
          <Text style={styles.unitText}>KM/H</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 220, // Biroz kengaytirildi, rasm siqilib qolmasligi uchun
    height: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dataContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10, // Rasmingdagi ko'rsatkich markaziga qarab buni o'zgartirishing mumkin
  },
  speedText: {
    fontSize: 60, // Kattaroq va jiddiyroq
    fontWeight: "900", // Eng qalin shrift
    color: "#00FF00",
    includeFontPadding: false, // Androiddagi ortiqcha joyni olib tashlaydi
    textShadowColor: "rgba(0, 255, 0, 0.9)",
    textShadowOffset: { width: 0, height: 0 }, // Soyani markazdan tarqaladigan qildik (Glow effect)
    textShadowRadius: 15,
  },
  unitText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "700",
    letterSpacing: 3,
    marginTop: -5, // Raqamga yaqinroq keltirish
  },
});

export default Speedometr;
