import { combineReducers } from 'redux';
import { loadCustomers } from './customerDetailReducer';

const reducer = combineReducers({
    loadCustomers
  });

  export default reducer;