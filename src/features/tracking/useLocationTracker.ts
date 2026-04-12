import { useState, useEffect } from "react";
import * as Location from "expo-location";

export const useLocationTracker = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      // 1. Requesting permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // 2. Real-time Subscription
      // This function executes every time the location changes
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation, // Highest precision
          timeInterval: 1000, // Update every 1 second
          distanceInterval: 1, // Update every 1 meter
        },
        (newLocation) => {
          setLocation(newLocation); // Updating the state
        },
      );
    })();

    // 3. Cleanup - stop tracking when component unmounts
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return { location, errorMsg };
};
