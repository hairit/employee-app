import { combineReducers } from 'redux';
import { employeesReducer } from './employeesReducer';
export const reducers = combineReducers({
  employee: employeesReducer,
});
