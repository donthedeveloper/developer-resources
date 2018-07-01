import {combineReducers} from 'redux';
import categories from './App/Categories/Categories.reducer';
import resources from './App/Categories/Category/Resources/Resources.reducer';

const reducers = combineReducers({categories, resources});

export default reducers;