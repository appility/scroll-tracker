import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from './common/debounce'
import styles from './styles/ScrollTracker.module.css';
import type { ScrollTrackerProps } from './ScrollTracker.d.ts'; 
import { trackScrollDepth } from './common/trackScrollDepth';

const ScrollTracker = ({ thresholds, showVisualIndicator=false, children }: ScrollTrackerProps) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    /* istanbul ignore next */
    if (typeof window === 'undefined') {
      console.warn('ScrollTracker component should not be used on the server side.');
    }
    const handleScroll = trackScrollDepth(thresholds, (offset) => setProgress(Math.min(offset, 100)));
    window.addEventListener('scroll', debounce(handleScroll, 200));
    return () => window.removeEventListener('scroll', handleScroll);
  }, [thresholds]);

  return (
    showVisualIndicator ? (
      <div className={styles.progressWrapper}>
        {children ? children(progress) : (
          <>
            <progress className={styles.progressBar} value={progress} max="100"></progress>
            <span className={styles.percentageText}>{Math.round(progress)}%</span>
          </>
        )}
      </div>
    ) : null
  );
};

export default ScrollTracker;

ScrollTracker.propTypes = {
  thresholds: PropTypes.arrayOf(PropTypes.number).isRequired,
  showVisualIndicator: PropTypes.bool,
  children: PropTypes.func,
};

ScrollTracker.defaultProps = {
  showVisualIndicator: false,
};