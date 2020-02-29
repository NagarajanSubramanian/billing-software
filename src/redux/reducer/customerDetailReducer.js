import { LOAD_CUSTOMER } from "./../../constants/constants";

export function loadCustomers(state = [], action) {
  switch (action.type) {
    case LOAD_CUSTOMER:
      return action.customerDatas;
    default:
      return state;
  }
}
