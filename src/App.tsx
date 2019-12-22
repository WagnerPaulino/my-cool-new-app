import React from 'react';
import { connect } from 'react-redux'
import './App.css';
import { AppState } from '.';
import { increment } from './actions/actions';

interface State {
  counter: number;
}

interface Props {
  increment: typeof increment
}

class App extends React.Component<Props, State> {

  public state: State;

  constructor(props: any) {
    super(props);
    this.state = {
      counter: 0
    };
  }



  increment = () => {
    this.setState({
      counter: this.props.increment(this.state.counter).counter
    });
  }


  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <p>Counter: {this.state.counter}</p>
        <button onClick={this.increment}>Incrementar</button>
      </div>
    )
  }

}

const mapStateToProps = (state: AppState) => {
  return {
     ...state.counter
  }
};

export default connect(mapStateToProps,{increment})(App);