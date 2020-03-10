import { combineReducers } from "redux";
import { loadCustomers } from "./customerDetailReducer";
import { loadProduct } from "./productDetailReducer";
import { catagoryData } from "./catagoryReducer";
import { supplierData } from "./supplierReducer";

const reducer = combineReducers({
  loadCustomers,
  loadProduct,
  catagoryData,
  supplierData
});

export default reducer;
