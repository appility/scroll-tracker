export {};
declare global {
  interface Window {
    ScrollTracker: {
      trackScrollDepth: (thresholds: number[]) => void;
    };
  }
}