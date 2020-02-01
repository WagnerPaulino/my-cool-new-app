import { AppRegistry } from 'react-native';
import App from './App';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { name as appName } from './app.json';

const rootReducer = combineReducers({})

const customMiddleWare = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
        return  action({ dispatch, getState});
    }
    return next(action);
}

const store = createStore(rootReducer, applyMiddleware(customMiddleWare))


AppRegistry.registerComponent(appName, <App store={store}/>);
