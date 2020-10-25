import { createStore, combineReducers, compose } from 'redux';
import { GET_ALL_SHIPS } from './constants';

const { NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === 'development';

const reducers = {
    spaceData: (oldState = {}, action) => {
        let state = {
            ships: null,
            searchResults: null
        }
        const { type } = action;
        switch (type) {
            case type === GET_ALL_SHIPS:
                return { ...state, ships: action.payload }
            default:
                return state;
        }
    },
};

const slices = combineReducers({ ...reducers });

const composeEnhancers = isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
    : compose;


const store = createStore(
    slices,
    composeEnhancers(),
);

export default store;
