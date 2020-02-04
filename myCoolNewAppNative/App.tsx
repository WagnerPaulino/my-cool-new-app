import React from 'react';
import DesejosList from './src/desejos-list';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { listaDesejosList, listaDesejosEdit } from './src/reducers/reducers';

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
      <DesejosList></DesejosList>
    </Provider>
  );
}

export default App;
