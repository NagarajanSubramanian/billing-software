import { combineReducers } from "redux";
import { loadCustomers } from "./customerDetailReducer";
import { loadProduct } from "./productDetailReducer";

const reducer = combineReducers({
  loadCustomers,
  loadProduct
});

export default reducer;
