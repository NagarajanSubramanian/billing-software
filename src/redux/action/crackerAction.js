import {
  LOAD_CATAGORY,
  LOAD_PRODUCT,
  LOAD_SUPPLIER
} from "./../../constants/constants";

export function loadCatagory(catagoryData) {
  return {
    type: LOAD_CATAGORY,
    catagoryData
  };
}

export function loadProduct(productData) {
  return {
    type: LOAD_PRODUCT,
    productData
  };
}

export function loadSupplier(supplierData) {
  return {
    type: LOAD_SUPPLIER,
    supplierData
  };
}
