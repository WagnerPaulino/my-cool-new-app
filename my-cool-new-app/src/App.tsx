import React from 'react';
import './App.css';
import { ListaDesejosListComponent } from './pages/lista-desejos-list-component';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { listaDesejosList, listaDesejosEdit } from './reducers/reducers';
import { ListaDesejosEditComponent } from './pages/lista-desejos-edit-component';
import { Provider } from 'react-redux';


const rootReducer = combineReducers({
  listaDesejos: listaDesejosList,
  desejo: listaDesejosEdit
})

const customMiddleWare = ({ dispatch, getState, store }: any) => (next: any) => (action: any) => {
  if (typeof action === 'function') {
    return action({ dispatch, getState, store });
  }
  return next(action);
}

const store = createStore(rootReducer, applyMiddleware(customMiddleWare))

export type AppState = ReturnType<typeof rootReducer>;

const App = () => (
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

export default App;