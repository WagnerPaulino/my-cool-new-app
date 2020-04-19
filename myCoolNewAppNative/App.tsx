import React from 'react';
import { Provider } from 'react-redux';
import { Router, Scene, Actions } from 'react-native-router-flux'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { listaDesejosList, listaDesejosEdit } from './src/reducers/reducers';
import { Button } from 'react-native';
import { ListaDesejos } from './src/models/ListaDesejos';
import { DesejosList } from './src/pages/desejos-list';
import { DesejosEdit } from './src/pages/desejos-edit';
import customMiddleware from './src/commons/custom-middleware';

const rootReducer = combineReducers({
  listaDesejos: listaDesejosList,
  desejo: listaDesejosEdit
})

export const store = createStore(rootReducer, applyMiddleware(customMiddleware))

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
