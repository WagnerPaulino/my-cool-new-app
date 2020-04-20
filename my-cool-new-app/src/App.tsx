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
import { listaDesejosList, listaDesejosEdit } from './reducers/desejos-reducers';
import { ListaDesejosEditComponent } from './pages/lista-desejos-edit-component';
import { Provider } from 'react-redux';
import { LoginComponent } from './pages/login.component';
import customMiddleware from './commons/custom-middleware';
import { usuarioReducer } from './reducers/usuarios-reducers';


const rootReducer = combineReducers({
  listaDesejos: listaDesejosList,
  desejo: listaDesejosEdit,
  usuario: usuarioReducer
})

const store = createStore(rootReducer, applyMiddleware(customMiddleware))

export type AppState = ReturnType<typeof rootReducer>;

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <div className="card-top">
            <Link className="text-card" to="/">Lista de Desejos</Link>
          </div>
          <Switch>
            <Route path="/" exact component={ListaDesejosListComponent} />
            <Route path="/login" component={LoginComponent} />
            <Route path="/desejo/:key?" component={ListaDesejosEditComponent} />
          </Switch>
        </div>
      </Router >
    </Provider>
  )
}

export default App;