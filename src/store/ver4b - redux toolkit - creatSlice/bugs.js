// actions
// In redux toolkit, action types are created by redux toolkit when we call createAction method

// In this version b, we use createSlice method, which combines createAction and CreateReducer
// slice = actionTypes + actionCreators + reducer

import { createSlice } from "@reduxjs/toolkit";

let initialState = [];
let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: initialState,
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        desc: action.payload.description,
        resolved: false,
      });
    },

    bugRemoved: (bugs, action) => {
      bugs.filter((bug) => bug.id !== action.payload.id);
    },

    bugResolved: (bugs, action) => {
      const bugToResolveId = bugs.findIndex((bug) => bug.id == action.payload.id);
      bugs[bugToResolveId].resolved = true;
    },
  },
});

export const { bugAdded, bugRemoved, bugResolved } = slice.actions;
export default slice.reducer;
