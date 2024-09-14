import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScrollTracker from './../src/ScrollTrackerComponent';

// Mock the setTimeout function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
jest.spyOn(global, 'setTimeout').mockImplementation((fn: any) => fn());

describe('ScrollTracker Component', () => {

  test('attaches scroll event listener', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    
    render(<ScrollTracker thresholds={[25, 50, 100]} />);
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    addEventListenerSpy.mockRestore();
  });

  test('displays progress with showVisualIndicator as true', () => {
    render(<ScrollTracker thresholds={[25, 50, 100]} showVisualIndicator={true} />);
    // Check the progress element
    const wrapper = screen.getByRole('progressbar');
    expect(wrapper).toBeInTheDocument();
  });

  test('renders with custom children when passed', () => {
    render(
      <ScrollTracker thresholds={[25, 50, 100]} showVisualIndicator>
        {(progress) => <span>{progress}%</span>}
      </ScrollTracker>
    );

    // Check that custom children render correctly
    const progressText = screen.getByText('0%');
    expect(progressText).toBeInTheDocument();
  });

  test('dispatches scrollProgress events on scroll', () => {
    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');
    const { unmount } = render(<ScrollTracker thresholds={[25, 50, 100]} />);

    // Mock scrollY and documentElement.scrollHeight
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
      Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 500, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    
    // Check that CustomEvent was dispatched with the correct percentage
    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: { percentage: 25 },
      })
    );
  
    unmount();
    dispatchEventSpy.mockRestore();
  });
  
  test('removes scroll event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    
    const { unmount } = render(<ScrollTracker thresholds={[25, 50, 100]} />);
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
