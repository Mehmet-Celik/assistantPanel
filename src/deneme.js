import React, { Component } from 'react';
import Toggle from './toggle';

const numbers = [1,2,3,4,5,6,7,8,9];
const listItems = numbers.map((number) =>
<li>{number}</li>
);
 class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
      }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

      
    
    render() {
        return (
            <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <ul>{listItems}</ul>
        <Toggle />
      </div>
        )
    }
}

export default Clock;