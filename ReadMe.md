
# ScrollTracker

**ScrollTracker** is a lightweight JavaScript library for tracking scroll depth in web pages. It allows you to dispatch events at specific scroll points and supports both vanilla JavaScript and React. It is optimized for performance using debouncing and can be easily integrated into both modern and legacy browsers.

## Features

- Scroll depth tracking at custom percentages.

- Lightweight and optimized for browser performance.

- Works with vanilla JavaScript and React.

- Exports UMD for browser compatibility and ES Module for modern environments.

- Supports custom scroll event dispatching.

- React version optionally shows a visual representation of the scroll progress or can use your own, using render props


## Installation

### npm

For use with React and JavaScript bundlers like Webpack or Rollup:

```bash
npm  install @appility/scrolltracker
```

For  vanilla  JavaScript,  include  the  UMD  bundle  directly  in  your  HTML:
```html
<script src="path/to/dist/index.umd.js"></script>
```

### Usage
#### Vanilla  JavaScript

To  track  scroll  depth  in  a  non-React  environment:
```html
<script src="path/to/dist/index.umd.js"></script>
<script>
  ScrollTracker.trackScrollDepth([25,  50,  75,  100]);
  window.addEventListener('scrollProgress', (event) => {
    console.log(`Scrolled to ${event.detail.percentage}%`);
  });
</script>
```
Note you can pass in custom values for the thresholds.


### React
To  use  with  React,  import  the  ScrollTracker  component  and  integrate  it  into  your  app:
```JSX
import ScrollTracker from '@appility/scrolltracker';
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
		<h1>Track Scroll Progress</h1>
		<article>...content...</article>
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
└── index.umd.js # UMD bundle for browsers
```
### License
This project is licensed under the ISC License.

### Author
Developed by Dermot Byrne.