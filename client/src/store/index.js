import {
    createStore,
    combineReducers
} from 'redux';
import boxesReducer from '../reducers/boxes';
import countriesReducer from '../reducers/countries';

const store = createStore(combineReducers({
    data: boxesReducer,
    countries: countriesReducer
}));

export default store;