import configureStore from "./configureStore";

import { bugAdded, bugRemoved, bugResolved } from "./bugs";
import { projectAdded } from "./projects";

const store = configureStore();

store.subscribe(() => console.log("store changed ", store));

console.log(store.getState());

store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugAdded({ description: "Bug 3" }));
store.dispatch(bugResolved({ id: 1 }));

store.dispatch(projectAdded({ name: "Ali" }));

console.log(store.getState());
