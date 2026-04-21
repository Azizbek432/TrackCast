import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { useTrackingStore } from "./trackingStore";

export const useLocationTracker = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { isRecording, updateLocation } = useTrackingStore();

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (newLocation) => {
          if (isRecording) {
            updateLocation(
              newLocation.coords.latitude,
              newLocation.coords.longitude,
              newLocation.coords.speed || 0,
            );
          }
        },
      );
    })();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isRecording]);

  return { errorMsg };
};
