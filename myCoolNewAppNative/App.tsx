import React from 'react';
import { Provider } from 'react-redux';
import { Router, Scene, Actions } from 'react-native-router-flux'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native';
import { ListaDesejos } from './src/models/ListaDesejos';
import { DesejosList } from './src/pages/desejos-list';
import { DesejosEdit } from './src/pages/desejos-edit';
import customMiddleware from './src/commons/custom-middleware';
import { authReducer } from './src/reducers/usuarios-reducers';
import { listaDesejosList, listaDesejosEdit } from './src/reducers/desejos-reducers';
import { LoginComponent } from './src/pages/login.component';
import Firebase, { FirebaseContext } from './src/environment/context';
import { logout } from './src/actions/usuario-actions';

const rootReducer = combineReducers({
  listaDesejos: listaDesejosList,
  desejo: listaDesejosEdit,
  auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(customMiddleware))

function ButtomBar() {
  return (
    <Button onPress={() => Actions["desejo-edit"]({ listaDesejo: new ListaDesejos() })} title="Novo" ></Button>
  );
}

const RouterDefinition = () => {

  const dispatch = useDispatch();

  function sair() {
    dispatch(logout());
  }

  return (
    <Router>
      <Scene key="root">
        <Scene key="desejos" component={DesejosList} title="Lista de Desejos"
          renderLeftButton={() => <Button title="Sair" onPress={sair}></Button>} renderRightButton={ButtomBar} />
        <Scene key="desejo-edit" component={DesejosEdit} title="Desejos" />
        <Scene key="login" component={LoginComponent} title="Autenticação" initial={true} />
      </Scene>
    </Router>
  )
}

const App = () => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <Provider store={store}>
        <RouterDefinition />
      </Provider>
    </FirebaseContext.Provider>
  );
}

export default App;
