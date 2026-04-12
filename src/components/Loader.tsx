import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import LottieView from "lottie-react-native";

export const Loader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          source={require("../../assets/loading.json")}
          autoPlay
          loop
          style={styles.lottie}
          renderMode="SOFTWARE"
        />
        <ActivityIndicator
          size="large"
          color="#00ff00"
          style={styles.fallback}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>ACQUIRING SATELLITES</Text>
        <Text style={styles.subtitle}>
          Please wait, calibrating your position...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  animationContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: "100%",
    height: "100%",
  },
  fallback: {
    position: "absolute",
  },
  textContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  title: {
    color: "#00ff00",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 3,
  },
  subtitle: {
    color: "#666",
    fontSize: 12,
    marginTop: 10,
    textTransform: "uppercase",
  },
});
