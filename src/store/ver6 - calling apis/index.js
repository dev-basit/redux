import * as actions from "./bugs";
import configureStore from "./configureStore";
import { apiCallBegan } from "../api";

const store = configureStore();

// store.subscribe(() => console.log("store changed ", store));

console.log(store.getState());

// store.dispatch(actions.bugAdded({ description: "Bug 1" }));
// store.dispatch(actions.bugAdded({ description: "Bug 1" }));
// store.dispatch(actions.bugAdded({ description: "Bug 2" }));
// store.dispatch(actions.bugAdded({ description: "Bug 3" }));
// store.dispatch(actions.bugResolved({ id: 1 }));

// dispatching function or calling apis
// store.dispatch(() => {
//   dispatch({ type: "bugsRecieved", bugs: [1, 2, 3] });
// });

// this will be passed to middleware and show error
// store.dispatch({ type: "error", payload: { message: "An error occured" } });

// this will also  be passed to middleware but wont show error because the type is not equal to "error"
// store.dispatch({ type: "error", payload: { message: "An error occured" } });

// calling apis
// store.dispatch({
//   type: "apiCallBegan",
//   payload: {
//     url: "/bugs",
//     onSucess: "bugs/bugsReceived",
//     onError: "apiRequestFailed",
//   },
// });

// i have created actionCreators for api calls inside store/api.js, I created beacuse above in type filed, "apiCallBegan" was used in 2 different place.
// store.dispatch(
//   apiCallBegan({
//     url: "/bugs",
//     onSucess: "bugs/bugsReceived",
//   })
// );

// we shouldn't write fetching logic in UI layer, because we might use it in 2 or more different places, so we should create actionCreators for it. Whenever and at any place we need it, we simple call this actionCreator
store.dispatch(actions.loadBugs());

setTimeout(() => {
  store.dispatch(actions.loadBugs());
}, 2000);

// use cache support method - loadBugs1()

// adding data to server - post call
store.dispatch(actions.addBug({ description: "bug1" }));

// resolving a bug, and saving data to server
store.dispatch(actions.resolveBug(1));

// assigning a bug to employee
store.dispatch(actions.assignBugToUser(1, 4));

console.log(store.getState());
