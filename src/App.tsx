import React from 'react';
import './App.css';

interface State {
  counter: number;
}

interface Props {}

export default class App extends React.Component<Props, State> {

  public state: State;

  constructor(props: any) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  increment = () => {
    this.setState({counter: (this.state.counter + 1)})
  }


  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <p>Counter: {this.state.counter}</p>
        <button onClick={this.increment}>Adicione um</button>
      </div>
    )
  }

}
