import { create } from "zustand";

interface TrackingState {
  isRecording: boolean;
  currentSpeed: number;
  distance: number;
  duration: number;
  startRecording: () => void;
  stopRecording: () => void;
  updateSpeed: (speed: number) => void;
}

export const useTrackingStore = create<TrackingState>((set) => ({
  isRecording: false,
  currentSpeed: 0,
  distance: 0,
  duration: 0,
  startRecording: () => set({ isRecording: true, distance: 0, duration: 0 }),
  stopRecording: () => set({ isRecording: false }),
  updateSpeed: (speed) => set({ currentSpeed: speed }),
}));
