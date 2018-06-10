import {combineReducers} from 'redux';
import categories from './App/Categories/Categories.reducer';

const reducers = combineReducers({
    categories
});

export default reducers;