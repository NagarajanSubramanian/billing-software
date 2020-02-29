import { combineReducers } from "redux";
import { loadCustomers } from "./customerDetailReducer";
import { loadProduct } from "./productDetailReducer";
import { catagoryData } from "./catagoryReducer";

const reducer = combineReducers({
  loadCustomers,
  loadProduct,
  catagoryData
});

export default reducer;
