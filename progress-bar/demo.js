import React from 'react';
import ProgressBar from './progress-bar';

export default class ProgressBarDemo extends React.Component {
    constructor() {
        super();
        this.state = {
            percent: 0,
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                percent: this.state.percent + 10,
            });
        }, 1000);
    }

    render() {
        return (
            <ProgressBar percent={this.state.percent} />
        );
    }
}
