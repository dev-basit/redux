import store from "./store";
import { bugAdded, bugResolved } from "./actions";

console.log(store.getState());

store.dispatch(bugAdded("Bug 1"));
store.dispatch(bugResolved(1));

console.log(store.getState());
