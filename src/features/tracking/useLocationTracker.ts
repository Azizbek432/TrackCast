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
      // 1. Ruxsat so'rash
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Joylashuvga ruxsat berilmadi!");
        return;
      }

      // 2. Real vaqtda kuzatish (Subscription)
      // Bu funksiya har safar joylashuv o'zgarganda ishlaydi
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation, // Eng yuqori aniqlik
          timeInterval: 1000, // Har 1 soniyada yangilash
          distanceInterval: 1, // Har 1 metr harakatlanganda yangilash
        },
        (newLocation) => {
          setLocation(newLocation); // Ma'lumotni yangilaymiz
        },
      );
    })();

    // 3. Tozalash (Cleanup) - component o'chganda kuzatishni to'xtatish
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return { location, errorMsg };
};
