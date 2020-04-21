import React, { useContext, useEffect } from 'react';
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
import PrivateRoute from './commons/private-router';
import { FirebaseContext } from './environment/context';


const rootReducer = combineReducers({
  listaDesejos: listaDesejosList,
  desejo: listaDesejosEdit,
  usuario: usuarioReducer
})

const store = createStore(rootReducer, applyMiddleware(customMiddleware))

export type AppState = ReturnType<typeof rootReducer>;

const App = () => {

  const firebase = useContext(FirebaseContext);
  var user: any = null;
  useEffect(() => {
    user = firebase.getCurrentUser()
  })

  return (
    <Provider store={store}>
      <Router>
        <div>
          <div className="card-top">
            <Link className="text-card" to="/">Lista de Desejos</Link>
          </div>
          <Switch>
            <PrivateRoute predicate={() => firebase.isLogged()} path="/" exact><ListaDesejosListComponent /></PrivateRoute>
            <Route path="/login" component={LoginComponent} />
            <PrivateRoute predicate={() => firebase.isLogged()} path="/desejo/:key?" ><ListaDesejosEditComponent /></PrivateRoute>
          </Switch>
        </div>
      </Router >
    </Provider>
  )
}

export default App;