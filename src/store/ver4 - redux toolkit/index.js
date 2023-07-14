import configureStore from "./configureStore";
import * as actions from "./bugs";

const store = configureStore();

store.subscribe(() => console.log("store changed ", store));

console.log(store.getState());

store.dispatch(actions.bugAdded({ description: "Bug 1" }));
store.dispatch(actions.bugAdded({ description: "Bug 2" }));
store.dispatch(actions.bugAdded({ description: "Bug 3" }));
store.dispatch(actions.bugResolved({ id: 1 }));

console.log(store.getState());
