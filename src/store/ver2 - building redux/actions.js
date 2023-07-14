import * as actions from "./actionTypes";

export function bugAdded(desc) {
  return {
    type: actions.BUG_ADDED,
    payload: { desc: desc },
  };
}

export function bugResolved(id) {
  return {
    type: actions.BUG_RESOLVED,
    payload: { id: id },
  };
}
