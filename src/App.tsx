import React from 'react';
import './App.css';
import Counter from './pages/Counter';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

interface State { }

interface Props { }

export default class App extends React.Component<Props, State> {

  render() {
    return (
      <Router>
        <div>
          <div className="card-top">
            <Link className="text-card" to="/">Home</Link>
            <Link className="text-card" to="/counter">Counter</Link>
          </div>
          <Switch>
            <Route path="/counter">
              <Counter />
            </Route>
          </Switch>
        </div>
      </Router >
    )
  }

}