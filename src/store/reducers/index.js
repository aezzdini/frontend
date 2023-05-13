// third-party  combination des reducers (reducer user, reducer roles ...)
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import user from './userSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu , user});

export default reducers;
