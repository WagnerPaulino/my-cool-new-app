import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { increment } from './reducers/reducers';

const rootReducer = combineReducers({
    counter: increment
})

const store = createStore(rootReducer)

export type AppState = ReturnType<typeof rootReducer>;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
