// in this code we export all reducers related to entities i.e., lastMile, fulfillment, management, onboarding etc

import { combineReducers } from "redux";
import bugReducer from "./bugs";
import projectReducer from "./projects.js";

export default combineReducers({
  bugs: bugReducer,
  projects: projectReducer,
});
