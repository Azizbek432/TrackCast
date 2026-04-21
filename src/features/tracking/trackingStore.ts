import { create } from "zustand";
import db from "../../database/db";

interface Session {
  id: string;
  date: string;
  distance: string;
  avgSpeed: string;
}

interface TrackingState {
  isRecording: boolean;
  speed: number;
  distance: number;
  route: Array<{ latitude: number; longitude: number }>;
  prevCoords: { latitude: number; longitude: number } | null;
  history: Session[];
  startTime: number | null;
  startRecording: () => void;
  stopRecording: () => void;
  updateLocation: (lat: number, lon: number, currentSpeed?: number) => void;
  saveSession: () => void;
}

export const useTrackingStore = create<TrackingState>((set, get) => ({
  isRecording: false,
  speed: 0,
  distance: 0,
  route: [],
  prevCoords: null,
  history: [],
  startTime: null,

  startRecording: () =>
    set({
      isRecording: true,
      speed: 0,
      distance: 0,
      route: [],
      prevCoords: null,
      startTime: Date.now(),
    }),

  stopRecording: () => set({ isRecording: false, speed: 0 }),

  saveSession: () => {
    const { distance, isRecording, startTime, history } = get();

    if (!isRecording && distance > 0 && startTime) {
      const durationInHours = (Date.now() - startTime) / 3600000;
      const calculatedAvgSpeed = (distance / 1000 / durationInHours).toFixed(1);
      const distKm = (distance / 1000).toFixed(2);
      const dateStr = new Date().toLocaleDateString();

      try {
        db.runSync(
          `INSERT INTO trips (date, distance, avgSpeed, maxSpeed) VALUES (?, ?, ?, ?);`,
          [dateStr, distKm, calculatedAvgSpeed, calculatedAvgSpeed],
        );
        console.log("Trip saved to SQLite! ✅");
      } catch (e) {
        console.error("DB Save Error:", e);
      }

      const newSession: Session = {
        id: Date.now().toString(),
        date: dateStr,
        distance: distKm,
        avgSpeed: calculatedAvgSpeed,
      };

      set({
        history: [newSession, ...history],
        startTime: null,
        distance: 0,
        route: [],
      });
    }
  },

  updateLocation: (lat, lon, currentSpeed = 0) => {
    const { isRecording, prevCoords, distance, route } = get();
    if (!isRecording) return;

    const speedInKmH = Math.max(0, currentSpeed * 3.6);
    const newCoord = { latitude: lat, longitude: lon };

    if (prevCoords) {
      const R = 6371e3;
      const f1 = (prevCoords.latitude * Math.PI) / 180;
      const f2 = (lat * Math.PI) / 180;
      const df = ((lat - prevCoords.latitude) * Math.PI) / 180;
      const dl = ((lon - prevCoords.longitude) * Math.PI) / 180;

      const a =
        Math.sin(df / 2) * Math.sin(df / 2) +
        Math.cos(f1) * Math.cos(f2) * Math.sin(dl / 2) * Math.sin(dl / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const newDistance = R * c;

      const validDistance = newDistance > 0.5 ? newDistance : 0;

      set({
        speed: speedInKmH,
        distance: distance + validDistance,
        route: [...route, newCoord],
        prevCoords: newCoord,
      });
    } else {
      set({
        speed: speedInKmH,
        prevCoords: newCoord,
        route: [newCoord],
      });
    }
  },
}));
