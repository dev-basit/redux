import * as actions from "./bugs";
import configureStore from "./configureStore";

const store = configureStore();

// store.subscribe(() => console.log("store changed ", store));

console.log(store.getState());

store.dispatch(actions.bugAdded({ description: "Bug 1" }));
// store.dispatch(actions.bugAdded({ description: "Bug 1" }));
// store.dispatch(actions.bugAdded({ description: "Bug 2" }));
// store.dispatch(actions.bugAdded({ description: "Bug 3" }));
// store.dispatch(actions.bugResolved({ id: 1 }));

// dispatching function or calling apis
store.dispatch(() => {
  dispatch({ type: "bugsRecieved", bugs: [1, 2, 3] });
});

// this will be passed to middleware and show error
store.dispatch({ type: "error", payload: { message: "An error occured" } });

// this will also  be passed to middleware but wont show error because the type is not equal to "error"
store.dispatch({ type: "error", payload: { message: "An error occured" } });

console.log(store.getState());
