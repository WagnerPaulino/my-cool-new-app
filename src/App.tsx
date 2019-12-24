import React from 'react';
import './App.css';
import ListaDesejosListComponent from './pages/lista-desejos-list-component';
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
            <Link className="text-card" to="/">Lista de Desejos</Link>
          </div>
          <Switch>
            <Route path="/">
              <ListaDesejosListComponent />
            </Route>
          </Switch>
        </div>
      </Router >
    )
  }

}