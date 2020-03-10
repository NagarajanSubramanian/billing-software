import { LOAD_SUPPLIER } from "./../../constants/constants";

export function supplierData(state = [], action) {
  switch (action.type) {
    case LOAD_SUPPLIER:
      var data = Object.assign(action.supplierData, []);
      return data;
    default:
      return state;
  }
}
