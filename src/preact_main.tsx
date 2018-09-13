import {h, render, Component} from 'preact';

class PreactHello extends Component {
    constructor() {
        super();
    }

    render() {
        return <div>Hello</div>;
    }
}

const AVG_SAMPLE_LENGTH = 10;

class RenderIntervals extends Component {

    render(props: any) {
        return (<div>
            <div>Last interval</div>
            <div>{props.lastInterval} ms</div>
            <div>Average interval (Last {AVG_SAMPLE_LENGTH} samples)</div>
            <div>{props.avgInterval} ms</div>
        </div>);
    }
}

class PreactHelloContainer extends Component {

    timeoutCancel: any;
    dateLastRender: Date;
    msSinceLastRenderList: number[];

    constructor() {
        super();
        this.state = {show: true};
        this.dateLastRender = new Date();
        this.msSinceLastRenderList = [];
    }

    componentDidMount() {
        this.timeoutCancel = setInterval(() => {
            this.setState({show: !this.state.show});
        }, 500);
    }

    componentWillUnmount() {
        clearInterval(this.timeoutCancel);
        this.setState({show: false});
    }

    render(props: any, state: any) {
        const now = new Date();
        const msSinceLastRender = now.getTime() - this.dateLastRender.getTime();
        this.msSinceLastRenderList.push(msSinceLastRender);
        if (this.msSinceLastRenderList.length > AVG_SAMPLE_LENGTH) {
            this.msSinceLastRenderList.shift();
        }
        const avgInterval = this.msSinceLastRenderList.reduce((accum, ms) => {
            return accum + ms;
        }, 0) / this.msSinceLastRenderList.length;
        this.dateLastRender = now;
        if (state.show) {
            let i;
            let helloList = [];
            for (i = 0; i < 10000; ++i) {
                helloList.push(<PreactHello></PreactHello>);
            }
            return (<div>
                <RenderIntervals lastInterval={msSinceLastRender} avgInterval={avgInterval}/>
                {helloList}
            </div>);
        } else {
            return (<div>
                <RenderIntervals lastInterval={msSinceLastRender} avgInterval={avgInterval}/>
                <div>empty</div>
            </div>);
        }
    }
}

// Test adding / removing the base component
// for (let j = 0; j < 20; ++j) {
//     console.log('preact j', j);
//     const root = render(<PreactHelloContainer />, document.body);
//     // and remove it...
//     render(null, document.body, root);
// }

render(<PreactHelloContainer/>, document.body);
