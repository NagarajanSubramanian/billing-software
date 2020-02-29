import { LOAD_CUSTOMER, LOAD_PRODUCT } from "./../../constants/constants";

export function loadCustomer(customerDatas) {
  return {
    type: LOAD_CUSTOMER,
    customerDatas
  };
}

export function loadProductData(productData) {
  return {
    type: LOAD_PRODUCT,
    productData
  };
}
