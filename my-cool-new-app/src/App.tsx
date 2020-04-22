import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { getCurrentUser } from './actions/usuario-actions';
import './App.css';
import PrivateRoute from './commons/private-router';
import { ListaDesejosEditComponent } from './pages/lista-desejos-edit-component';
import { ListaDesejosListComponent } from './pages/lista-desejos-list-component';
import { LoginComponent } from './pages/login.component';

const App = () => {

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
          <PrivateRoute predicate={() => user?.logged} path="/" exact><ListaDesejosListComponent /></PrivateRoute>
          <Route path="/login" component={LoginComponent} />
          <PrivateRoute predicate={() => user?.logged} path="/desejo/:key?" ><ListaDesejosEditComponent /></PrivateRoute>
        </Switch>
      </div>
    </Router >
  )
}

export default App;