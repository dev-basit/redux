// actions
const BUG_ADDED = "bugAddded";
const BUG_REMOVED = "bugRemoved";
const BUG_RESOLVED = "bugResolved";

// action creators
export function bugAdded(desc) {
  return {
    type: BUG_ADDED,
    payload: { desc: desc },
  };
}

export function bugResolved(id) {
  return {
    type: BUG_RESOLVED,
    payload: { id: id },
  };
}

// reducer
let lastId = 0;

export default reducer = (state = [], action) => {
  switch (action.type) {
    case BUG_ADDED:
      return [...state, { id: ++lastId, desc: action.payload.desc, resolved: false }];

    case BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);

    case BUG_RESOLVED: {
      let bugToResolve = state.find((item) => item.id == action.payload.id);
      return [...state, { ...bugToResolve, resolved: true }];
    }

    default:
      return state;
  }
};
