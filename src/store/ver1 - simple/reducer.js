import * as actions from "./actionTypes";

let lastId = 0;

export default reducer = (state = [], action) => {
  switch (action.type) {
    case actions.BUG_ADDED:
      return [...state, { id: ++lastId, desc: action.payload.desc, resolved: false }];

    case actions.BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);

    case actions.BUG_RESOLVED: {
      let bugToResolve = state.find((item) => item.id == action.payload.id);
      return [...state, { ...bugToResolve, resolved: true }];
    }

    default:
      return state;
  }
};
