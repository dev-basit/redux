import store from "./customStore";
import * as actions from "./actions";

store.subscribe(() => console.log("store changed ", store));

console.log(store.getState());

store.dispatch(actions.bugAdded("Bug 1"));
store.dispatch(actions.bugResolved(1));

console.log(store.getState());
