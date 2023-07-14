// actions
// In redux toolkit, action types are created by redux toolkit when we call createAction method

// In this version, we use createSlice method, which combines createAction and CreateReducer
// slice = actionTypes + actionCreators + reducer

import { createSlice } from "@reduxjs/toolkit";

// create memoized selected for better performance
import { createSelector } from "reselect";

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

    bugAssignedToEmployee: (bugs, action) => {
      const { bugId, employeeId } = action.payload;
      const index = bugs.findIndex((bug) => bug.id == bugId);
      bugs[index].userId = userId;
    },
  },
});

export const { bugAdded, bugRemoved, bugResolved, bugAssignedToEmployee } = slice.actions;
export default slice.reducer;

// Selectors - get data from store
// export const getUnresolvedBugs = (state) => state.entites.bugs.filter((bug) => !bug.resolved);

// creating memoized selector, memoized version of above selector
// in this case if list of bugs remains unchanged, we will get result from cache, this function will not be computer again
export const getUnresolvedBugs = createSelector(
  (state) => state.entites.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

// if selector involves multiple dependencies
// in this case if list of bugs and projects remains unchanged, we will get result from cache, this function will not be computer again
export const getUnresolvedBugs2 = createSelector(
  (state) => state.entites.bugs,
  (state) => state.entites.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsAssignedToEmployee = (userId) =>
  createSelector(state.entities.bugs, (bugs) => bugs.filter((bug) => bug.userId === userId));
