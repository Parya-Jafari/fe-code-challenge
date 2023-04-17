import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducers';
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
const history = createBrowserHistory();
let store;
let persistor;

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = hist => persistReducer(persistConfig, reducers(hist));

export default function create(initialState) {
    store = createStore(
        pReducer(history),
        initialState,
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history),
                thunkMiddleware,
                promiseMiddleware,
            )
        )
    );

    persistor = persistStore(store);

    return {store, persistor};
}

export const getStore = () => {
    return store;
};

export const getHistory = () => {
    return history;
};
