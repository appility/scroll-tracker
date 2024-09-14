// ScrollTracker.d.ts
import { ReactNode } from 'react';

export interface ScrollTrackerProps {
  thresholds: number[];
  showVisualIndicator?: boolean;
  children?: (progress: number) => ReactNode;
}