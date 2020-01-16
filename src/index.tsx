import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { listaDesejosList, listaDesejosEdit, findQuestionarios } from './reducers/reducers';

const rootReducer = combineReducers({
    listaDesejos: listaDesejosList,
    desejo: listaDesejosEdit,
    questionarios: findQuestionarios
})

function triggerFunction(params: any) {
    console.log(params)
    return params;
}

const customMiddleWare = ({ dispatch, getState }: any) => (next: any) => (action: any) => {
    if (typeof action === 'function') {
        action({ dispatch, getState, ...triggerFunction })
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
