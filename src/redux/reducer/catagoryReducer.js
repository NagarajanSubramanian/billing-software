import { LOAD_CATAGORY } from "./../../constants/constants";

export function catagoryData(state = [], action) {
  switch (action.type) {
    case LOAD_CATAGORY:
      var data = Object.assign(action.catagoryData, []);
      return data;
    default:
      return state;
  }
}
