import { legacy_createStore } from "redux";
import reducer from "./bugs";

export const configureStore = function () {
  const store = legacy_createStore(reducer);
  return store;
};
