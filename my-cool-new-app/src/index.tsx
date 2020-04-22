import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Firebase, { FirebaseContext } from './environment/context';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { listaDesejosList, listaDesejosEdit } from './reducers/desejos-reducers';
import { usuarioReducer } from './reducers/usuarios-reducers';
import customMiddleware from './commons/custom-middleware';
import { Provider } from 'react-redux';

const rootReducer = combineReducers({
    listaDesejos: listaDesejosList,
    desejo: listaDesejosEdit,
    usuario: usuarioReducer
})

const store = createStore(rootReducer, applyMiddleware(customMiddleware))

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <Provider store={store}>
            <App />
        </Provider>
    </FirebaseContext.Provider>,
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
