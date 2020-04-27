import React, { useContext, useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { applyMiddleware, combineReducers, createStore } from 'redux';
import './App.css';
import customMiddleware from './commons/custom-middleware';
import PrivateRoute from './commons/private-router';
import Firebase, { FirebaseContext } from './environment/context';
import { ListaDesejosEditComponent } from './pages/lista-desejos-edit-component';
import { ListaDesejosListComponent } from './pages/lista-desejos-list-component';
import { LoginComponent } from './pages/login.component';
import { listaDesejosEdit, listaDesejosList } from './reducers/desejos-reducers';
import { authReducer } from './reducers/usuarios-reducers';
import { logout } from './actions/usuario-actions';

const rootReducer = combineReducers({
  listaDesejos: listaDesejosList,
  desejo: listaDesejosEdit,
  auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(customMiddleware))

const RouterDefinitions = () => {

  const [user, setUser] = useState<any>(undefined);
  const firebaseContext = useContext(FirebaseContext);
  const authState = useSelector((store: any) => store.auth.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    let subscriber = firebaseContext.getCurrentAuth()?.onAuthStateChanged((user: any) => setUser(user));
    return subscriber;
  })

  function isLogged() {
    return user !== null && user !== undefined;
  }

  function sair() {
    console.log(authState)
    dispatch(logout());
  }

  return (
    <Router>
      <div>
        <div className="card-top">
          <Link className="text-card" to="/">Lista de Desejos {isLogged() ? <span>- {user?.displayName}</span> : <span></span>}</Link>
          {isLogged() ? <button onClick={sair}>Sair</button> : <span></span>}
        </div>
        <Switch>
          <PrivateRoute predicate={() => isLogged()} path="/" component={ListaDesejosListComponent} exact></PrivateRoute>
          <Route path="/login" component={LoginComponent} />
          <PrivateRoute predicate={() => isLogged()} path="/desejo/:key?" component={ListaDesejosEditComponent} ></PrivateRoute>
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