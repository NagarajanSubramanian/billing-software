import { LOAD_PRODUCT } from "../../constants/constants";

export function loadProduct(state = [], action) {
  switch (action.type) {
    case LOAD_PRODUCT:
      return action.productData;
    default:
      return state;
  }
}
