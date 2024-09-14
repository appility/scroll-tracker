import { debounce } from './common/debounce'
import { trackScrollDepth } from './common/trackScrollDepth';

(function () {
  const trackScroll = (thresholds: number[]): void => {
    const handleScroll = trackScrollDepth(thresholds, () => null);
    window.addEventListener('scroll', debounce(handleScroll, 200));
  };
  // Attach to the global object for UMD
  // eslint-disable-next-line
  (window as any).ScrollTrackerUtility = { trackScroll };
})();
