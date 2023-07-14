// actions
// In redux toolkit, action types are created by redux toolkit when we call createAction method

// In this version b, we use createSlice method, which combines createAction and CreateReducer
// slice = actionCreators + reducer

import { createSlice } from "@reduxjs/toolkit";

let projects = [];
let lastId = 0;

const slice = createSlice({
  name: "projects",
  initialState: projects,
  reducers: {
    projectAdded: (projects, action) => {
      projects.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

export const { projectAdded } = slice.actions;
export default slice.reducer;
