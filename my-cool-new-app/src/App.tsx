import { AppBar, IconButton, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { useContext, useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { logout } from './actions/usuario-actions';
import './App.css';
import customMiddleware from './commons/custom-middleware';
import PrivateRoute from './commons/private-router';
import Firebase, { FirebaseContext } from './environment/context';
import { ListaDesejosEditComponent } from './pages/lista-desejos-edit-component';
import { ListaDesejosListComponent } from './pages/lista-desejos-list-component';
import { LoginComponent } from './pages/login.component';
import { listaDesejosEdit, listaDesejosList } from './reducers/desejos-reducers';
import { authReducer } from './reducers/usuarios-reducers';
import { appbarStyles, mainTheme } from './themes/themes';

const rootReducer = combineReducers({
  listaDesejos: listaDesejosList,
  desejo: listaDesejosEdit,
  auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(customMiddleware))

const RouterDefinitions = () => {

  const classes = appbarStyles();
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className="text-card" to="/">Lista de Desejos {isLogged() ? <span>- {user?.displayName}</span> : <span></span>}</Link>
          </Typography>
          {isLogged() ? <IconButton onClick={sair} edge="end" color="inherit"><ExitToAppIcon /></IconButton> : <span></span>}
        </Toolbar>
      </AppBar>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute predicate={() => isLogged()}>
              <ListaDesejosListComponent />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginComponent />} />
        <Route
          path="/desejo/"
          element={
            <PrivateRoute predicate={() => isLogged()}>
              <ListaDesejosEditComponent />
            </PrivateRoute>
          }
        />
        <Route
          path="/desejo/:key"
          element={
            <PrivateRoute predicate={() => isLogged()}>
              <ListaDesejosEditComponent />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router >
  )
}

const App = () => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <Provider store={store}>
        <ThemeProvider theme={mainTheme}>
          <RouterDefinitions />
        </ThemeProvider>
      </Provider>
    </FirebaseContext.Provider>
  )
}

export default App;