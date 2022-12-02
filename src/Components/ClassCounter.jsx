import React from "react";

class ClassCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };

        this.inCrement = this.inCrement.bind(this);
        this.deCrement = this.deCrement.bind(this);
    }

    inCrement() {
        this.setState({ count: this.state.count + 1 });
    }

    deCrement() {
        this.setState({ count: this.state.count - 1 });
    }

    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.inCrement}>Increment</button>
                <button onClick={this.deCrement}>Decrement</button>
            </div>
        );
    }
}

export default ClassCounter;
