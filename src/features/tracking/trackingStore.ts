import { create } from "zustand";

interface TrackingState {
  isRecording: boolean;
  distance: number;
  route: Array<{ latitude: number; longitude: number }>;
  prevCoords: { latitude: number; longitude: number } | null;
  startRecording: () => void;
  stopRecording: () => void;
  updateLocation: (lat: number, lon: number) => void;
}

export const useTrackingStore = create<TrackingState>((set, get) => ({
  isRecording: false,
  distance: 0,
  route: [],
  prevCoords: null,

  startRecording: () =>
    set({ isRecording: true, distance: 0, route: [], prevCoords: null }),

  stopRecording: () => set({ isRecording: false }),

  updateLocation: (lat, lon) => {
    const { isRecording, prevCoords, distance, route } = get();
    if (!isRecording) return;

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

      set({
        distance: distance + newDistance,
        route: [...route, newCoord],
        prevCoords: newCoord,
      });
    } else {
      set({
        prevCoords: newCoord,
        route: [newCoord],
      });
    }
  },
}));
