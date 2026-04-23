import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Screen imports (Make sure the paths are correct)
import { HomeScreen } from "./src/screens/HomeScreen";
import { HistoryScreen } from "./src/screens/HistoryScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#00ff00", // Active color (Green)
          tabBarInactiveTintColor: "#888", // Inactive color (Gray)
          tabBarStyle: {
            backgroundColor: "#000", // Black background
            borderTopWidth: 0, // Remove top border
            height: 65,
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
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: "History" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
