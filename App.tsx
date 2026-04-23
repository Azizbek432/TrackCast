import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen } from "./src/screens/HomeScreen";
import { HistoryScreen } from "./src/screens/HistoryScreen";
import { initializeDatabase } from "./src/database/db";

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    const init = async () => {
      await initializeDatabase();
    };
    init();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#00ff00",
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            backgroundColor: "#000",
            position: "absolute",
            borderTopWidth: 0,
            elevation: 10,
            height: 70,
            paddingBottom: 10,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "help-circle";

            if (route.name === "Home") {
              iconName = "speedometer";
            } else if (route.name === "History") {
              iconName = "time";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
