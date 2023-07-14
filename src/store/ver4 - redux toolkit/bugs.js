// actions
// In redux toolkit, action types are created by redux toolkit when we call createAction method

import { createAction, createReducer } from "@reduxjs/toolkit";

// action creators
export const bugAdded = createAction("bugAdded");
export const bugRemoved = createAction("bugRemoved");
export const bugResolved = createAction("bugResolved");

// reducer
let initialState = [];
let lastId = 0;

export default createReducer((state = initialState), {
  [bugAdded.type]: (bugs, action) => {
    bugs.push({
      id: ++lastId,
      desc: action.payload.description,
      resolved: false,
    });
  },

  [bugRemoved.type]: (bugs, action) => {
    bugs.filter((bug) => bug.id !== action.payload.id);
  },

  [bugResolved.type]: (bugs, action) => {
    const bugToResolveId = bugs.findIndex((bug) => bug.id == action.payload.id);
    bugs[bugToResolveId].resolved = true;
  },
});
