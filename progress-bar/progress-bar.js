import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './progress-bar.scss';

/**
 * @name ProgressBar
 * @description A progress bar which shows the progress of something.
 * @prop {percent} - icon of link
 * @prop {transitionDuration} - how many milliseconds (ms) a transition effect takes to complete
 * @prop {classNames} - Classes added to customize
 * @example
 * <ProgressBar percent={90} scrollDuration={2000} classNames="CustomProgress" />
 */
export default function ProgressBar(props) {
    const cls = classNames(ProgressBar.displayName, {
        [props.classNames]: props.classNames,
    });
    const style = {
        width: (props.percent >= 100) ? '100%' : `${props.percent}%`,
        transitionDuration: `${props.transitionDuration / 1000}s`,
    };
    return (
        <div className={cls} style={style} />
    );
}

ProgressBar.propTypes = {
    percent: PropTypes.number.isRequired,
    transitionDuration: PropTypes.number,
    classNames: PropTypes.string,
};
ProgressBar.displayName = 'g-progress-bar';
ProgressBar.defaultProps = {
    percent: 0,
    transitionDuration: 1000,
};
