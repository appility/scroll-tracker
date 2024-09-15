
# ScrollTracker

**ScrollTracker** is a lightweight JavaScript library for tracking scroll depth in web pages. It allows you to dispatch events at specific scroll points and supports both vanilla JavaScript and React. It is optimized for performance using debouncing and can be easily integrated into both modern and legacy browsers.

## Features

- Scroll depth tracking at custom percentages.

- Lightweight and optimized for browser performance.

- Works with vanilla JavaScript and React.

- Exports UMD for browser compatibility and ES Module for modern environments.

- Supports custom scroll event dispatching.

- React version optionally shows a visual representation of the scroll progress or allows you to create a custom scroll indicator using render props


## Installation

### npm

For use with React and JavaScript bundlers like Webpack or Rollup:

```bash
npm install @appility/scrolltracker
```

For  vanilla  JavaScript,  include  the  UMD  bundle  directly  in  your  HTML:
```html
<script src="https://unpkg.com/@appility/scrolltracker"></script>
```

### Usage
#### Vanilla  JavaScript

To  track  scroll  depth  in  a  non-React  environment:
```html
<script src="https://unpkg.com/@appility/scrolltracker"></script>
<script>
  if (window.ScrollTrackerUtility) {
    window.ScrollTrackerUtility.trackScroll([25, 50, 100]);
    window.addEventListener('scrollProgress', (event) => {
      const updateElement = document.getElementById('update');
      if (updateElement) {
        updateElement.textContent = `Scrolled to ${event.detail.percentage}%`;
      }
    });
  } else {
    console.error('ScrollTrackerUtility is not defined.');
  }
</script>
```
Note you can pass in custom values for the thresholds.


### React
To  use  with  React, import the ScrollTracker component and integrate it into your app:
```JSX
import React, { useEffect } from 'react';
import ScrollTracker from '@appility/scrolltracker/react';
function App() {
  useEffect(() => {
    // event listener for scrollProgress
    const handleScrollProgress = (event) => {
      console.log(`Scrolled to ${event.detail.percentage}%`);
    };

    window.addEventListener('scrollProgress', handleScrollProgress);

    // cleanup to avoid memory leaks
    return () => {
      window.removeEventListener('scrollProgress', handleScrollProgress);
    };
  }, []);
  return (
	<div>
	  <ScrollTracker thresholds={[25, 50, 100]} showVisualIndicator />
		<h1>Track Scroll Progress</h1>
		<article style={{"height": "10000px"}}>...long content...</article>
	</div>
);
}
export default App;
```

#### Custom JSX
If required the react component can receive children as a function.
If provided, the children function receives the progress value and renders custom JSX.
If no children are provided, the default JSX (progress bar and percentage text) is rendered.

```JSX
<ScrollTracker thresholds={[25, 50, 100]} showVisualIndicator>
  {(progress) => (
    <div>Scroll progress: {Math.round(progress)}%</div>
  )}
</ScrollTracker>
```


### Development

Clone the repository:

```bash
git clone https://github.com/appility/scroll-tracker.git
```

Install dependencies:
```bash
npm install
```

Build the project:
```bash
npm run build
```

Run tests:
```bash
npm run test
```

Run lint:
```bash
npm run lint
```

### Project Structure

```graphql
src/
├── ScrollTrackerComponent.tsx # React component
└── scrollTrackerUtility.ts # Vanilla JS function
dist/
├── index.js # CommonJS bundle
├── index.esm.js # ES module
├── index.umd.js # UMD bundle for browsers
└── react.js # React component
```
### License
This project is licensed under the ISC License.

### Author
Developed by Dermot Byrne.