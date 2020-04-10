import React from 'react';
import { DesejosList } from './src/desejos-list';
import { DesejosEdit } from './src/desejos-edit';
import { Provider } from 'react-redux';
import { Router, Scene, Actions } from 'react-native-router-flux'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { listaDesejosList, listaDesejosEdit } from './src/reducers/reducers';
import { Button } from 'react-native';
import { ListaDesejos } from './src/models/ListaDesejos';

const rootReducer = combineReducers({
  listaDesejos: listaDesejosList,
  desejo: listaDesejosEdit
})

const customMiddleWare = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === 'function') {
    return action({ dispatch, getState });
  }
  return next(action);
}

export const store = createStore(rootReducer, applyMiddleware(customMiddleWare))

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Scene key="root">
          <Scene key="desejos" component={DesejosList} title="Lista de Desejos" initial={true} renderRightButton={ButtomBar} />
          <Scene key="desejo-edit" component={DesejosEdit} title="Desejos" />
        </Scene>
      </Router>
    </Provider>
  );
}

function ButtomBar() {
  return (
    <Button onPress={() => Actions["desejo-edit"]({ listaDesejo: new ListaDesejos() })} title="Novo" ></Button>
  );
}

export default App;
