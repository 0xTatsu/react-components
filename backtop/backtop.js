import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './backtop.scss';

const defaultIcon = require('./backtop.svg');

/**
 * @name BackTop
 * @description This "Back to top" link allows users to smoothly scroll back to the top of the page.
 * @prop {icon} - icon of link
 * @prop {scrollDuration} - how many milliseconds (ms) a transition effect takes to complete
 * @prop {classNames} - Classes added to customize
 * @example
 * <BackTop icon={newIcon} scrollDuration={1000} />
 */
export default class BackTop extends React.Component {
    static displayName = 'BackTop';

    static propTypes = {
        icon: PropTypes.string,
        scrollDuration: PropTypes.number,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        scrollDuration: 1000,
        icon: defaultIcon,
    };

    constructor() {
        super();
        this.state = {
            isShow: !!window.document.body.scrollTop,
        };
    }

    componentDidMount() {
        this.onScroll();
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll = () => {
        const scrollTop = window.document.body.scrollTop;
        if (scrollTop && !this.state.isShow) {
            this.setState({
                isShow: true,
            });
        } else if (!scrollTop && this.state.isShow) {
            this.setState({
                isShow: false,
            });
        }
    };

    onClickToTop = () => {
        window.requestAnimationFrame(this.step(this.props.scrollDuration));
    };

    /**
     * @description: change the speed of backTop button
     * Reference: http://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery
     */
    step = (scrollDuration) => {
        const instance = {};
        const cosParameter = window.scrollY / 2;

        return function _step(newTimestamp) {
            instance.scrollCount = instance.scrollCount || 0;
            instance.oldTimestamp = instance.oldTimestamp || window.performance.now();
            instance.scrollCount += Math.PI / (scrollDuration / (newTimestamp - instance.oldTimestamp));
            if (instance.scrollCount >= Math.PI) window.scrollTo(0, 0);
            if (window.scrollY === 0) return;
            window.scrollTo(0, Math.round(cosParameter + (cosParameter * Math.cos(instance.scrollCount))));
            instance.oldTimestamp = newTimestamp;
            window.requestAnimationFrame(_step);
        };
    };

    render() {
        const cls = classNames(BackTop.displayName, {
            showing: this.state.isShow,
            [this.props.classNames]: !!this.props.classNames,
        });

        return (
            <div className={cls} onClick={this.onClickToTop}>
                <img src={this.props.icon} alt="" />
            </div>
        );
    }
}
