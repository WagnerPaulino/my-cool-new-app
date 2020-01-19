import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { listaDesejosList, listaDesejosEdit } from './reducers/reducers';

const rootReducer = combineReducers({
    listaDesejos: listaDesejosList,
    desejo: listaDesejosEdit
})

const customMiddleWare = ({ dispatch, getState }: any) => (next: any) => (action: any) => {
    if (typeof action === 'function') {
        return  action({ dispatch, getState});
    }
    return next(action);
}

const store = createStore(rootReducer, applyMiddleware(customMiddleWare))

export type AppState = ReturnType<typeof rootReducer>;

ReactDOM.render(
    <App store={store} />,
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
