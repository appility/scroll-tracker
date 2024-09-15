import React from 'react';
import PropTypes from 'prop-types';
import type { ScrollTrackerProps } from './ScrollTracker.d.ts';
declare const ScrollTracker: {
    ({ thresholds, showVisualIndicator, children }: ScrollTrackerProps): React.JSX.Element | null;
    propTypes: {
        thresholds: PropTypes.Validator<(number | null | undefined)[]>;
        showVisualIndicator: PropTypes.Requireable<boolean>;
        children: PropTypes.Requireable<(...args: any[]) => any>;
    };
};
export default ScrollTracker;
