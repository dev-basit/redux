// root level reducer
// in this code we combine all reducers entities + auth + ui + others in our store or app and export it

import { combineReducers } from "redux";
import entitesReducer from "./entities";

export default combineReducers({
  entites: entitesReducer,
});
