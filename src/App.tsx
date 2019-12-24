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
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/counter">Counter</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/counter">
              <Counter />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }

}