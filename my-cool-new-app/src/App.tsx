import React, { useEffect, useState, useContext } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import './App.css';
import PrivateRoute from './commons/private-router';
import { ListaDesejosEditComponent } from './pages/lista-desejos-edit-component';
import { ListaDesejosListComponent } from './pages/lista-desejos-list-component';
import { LoginComponent } from './pages/login.component';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { listaDesejosList, listaDesejosEdit } from './reducers/desejos-reducers';
import { authReducer } from './reducers/usuarios-reducers';
import customMiddleware from './commons/custom-middleware';
import Firebase, { FirebaseContext } from './environment/context';

const rootReducer = combineReducers({
  listaDesejos: listaDesejosList,
  desejo: listaDesejosEdit,
  auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(customMiddleware))

const RouterDefinitions = () => {

  const [user, setUser] = useState<any>(undefined);
  const firebaseContext = useContext(FirebaseContext);

  useEffect(() => {
    let subscriber = firebaseContext.getCurrentAuth()?.onAuthStateChanged((user: any) => setUser(user));
    return subscriber;
  })

  function isLogged() {
    return user !== null && user !== undefined;
  }

  return (
    <Router>
      <div>
        <div className="card-top">
          <Link className="text-card" to="/">Lista de Desejos {isLogged() ? <span>- {user?.displayName}</span> : <span></span>}</Link>
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