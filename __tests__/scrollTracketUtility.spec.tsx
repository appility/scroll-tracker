import { jest } from '@jest/globals';

// Mock the setTimeout function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
jest.spyOn(global, 'setTimeout').mockImplementation((fn: any) => fn());

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('./../src/scrollTrackerUtility');

// Extend the global Window interface
declare global {
  interface Window {
    ScrollTrackerUtility: {
      trackScroll: (thresholds: number[]) => void;
    };
  }
}

describe('scrollTracketUtility', () => {
  test('dispatches scrollProgress events at scroll thresholds, with debounce mocked', () => {
    const scrollEventSpy = jest.spyOn(window, 'dispatchEvent');
  
    // Simulate a tall article
    document.body.innerHTML = '<article style="height: 2000px"></article>';
    
    // Mock scroll position and viewport height
    Object.defineProperty(window, 'scrollY', { value: 1000, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 500, writable: true });
  
    // Trigger the trackScrollDepth logic
    window.ScrollTrackerUtility.trackScroll([25, 50, 100]);
  
    // Trigger the scroll handler directly
    window.dispatchEvent(new Event('scroll'));
  
    // Check that the CustomEvent was dispatched with the correct percentage
    expect(scrollEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: { percentage: 50 },
      })
    );
  
    // Cleanup spies
    scrollEventSpy.mockRestore();
  });               
})