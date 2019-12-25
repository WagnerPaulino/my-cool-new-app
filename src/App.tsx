import React from 'react';
import './App.css';
import PropTypes from 'prop-types'
import ListaDesejosListComponent from './pages/lista-desejos-list-component';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ListaDesejosEditComponent from './pages/lista-desejos-edit-component';
import { Provider } from 'react-redux';

const App = ({ store }: any) => (
  <Provider store={store}>
    <Router>
      <div>
        <div className="card-top">
          <Link className="text-card" to="/">Lista de Desejos</Link>
        </div>
        <Switch>
          <Route path="/" exact component={ListaDesejosListComponent} />
          <Route path="/desejo/:key?" component={ListaDesejosEditComponent} />
        </Switch>
      </div>
    </Router >
  </Provider>
)

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App;