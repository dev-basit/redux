import { configureStore } from "./configureStore";
import * as actions from "./bugs";

const store = configureStore();

store.subscribe(() => console.log("store changed ", store));

console.log(store.getState());

store.dispatch(actions.bugAdded("Bug 1"));
store.dispatch(actions.bugResolved(1));

console.log(store.getState());
