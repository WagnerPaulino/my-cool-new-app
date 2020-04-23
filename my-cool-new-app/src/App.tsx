import React, { useEffect } from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { getCurrentUser } from './actions/usuario-actions';
import './App.css';
import PrivateRoute from './commons/private-router';
import { ListaDesejosEditComponent } from './pages/lista-desejos-edit-component';
import { ListaDesejosListComponent } from './pages/lista-desejos-list-component';
import { LoginComponent } from './pages/login.component';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { listaDesejosList, listaDesejosEdit } from './reducers/desejos-reducers';
import { usuarioReducer } from './reducers/usuarios-reducers';
import customMiddleware from './commons/custom-middleware';
import Firebase, { FirebaseContext } from './environment/context';

const rootReducer = combineReducers({
  listaDesejos: listaDesejosList,
  desejo: listaDesejosEdit,
  usuario: usuarioReducer
})

const store = createStore(rootReducer, applyMiddleware(customMiddleware))

const RouterDefinitions = () => {

  const user = useSelector((store: any) => store.usuario)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch])

  return (
    <Router>
      <div>
        <div className="card-top">
          <Link className="text-card" to="/">Lista de Desejos {user.logged ? <span>- {user.usuario.displayName}</span> : <span></span>}</Link>
        </div>
        <Switch>
          <PrivateRoute predicate={() => user?.logged} path="/" component={ListaDesejosListComponent} exact></PrivateRoute>
          <Route path="/login" component={LoginComponent} />
          <PrivateRoute predicate={() => user?.logged} path="/desejo/:key?" component={ListaDesejosEditComponent} ></PrivateRoute>
        </Switch>
      </div>
    </Router >
  )
}

const App = () => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <Provider store={store}>
        <RouterDefinitions />
      </Provider>
    </FirebaseContext.Provider>
  )
}

export default App;