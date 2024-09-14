import React, { useEffect } from 'react';
import './App.css';
import ScrollTracker from './dist/react.js';

function App() {
  useEffect(() => {
    // Event listener for scrollProgress
    const handleScrollProgress = (event) => {
      console.log(`Scrolled to ${event.detail.percentage}%`);
    };

    window.addEventListener('scrollProgress', handleScrollProgress);

    // Cleanup to avoid memory leaks
    return () => {
      window.removeEventListener('scrollProgress', handleScrollProgress);
    };
  }, []);
  return (
	<div>
	  <ScrollTracker thresholds={[25, 50, 100]} showVisualIndicator />
    <h1>Scroll Tracker Demo - React</h1>
    <article style={{"height": "10000px"}}>
      Scroll down to see the progress events.
    </article>
	</div>
);
}
export default App;
