import { LOAD_PRODUCT } from "../../constants/constants";

export function loadProduct(state = [], action) {
  console.log(action);
  switch (action.type) {
    case LOAD_PRODUCT:
      var data = Object.assign(action.productData, []);
      return data;
    default:
      return state;
  }
}
