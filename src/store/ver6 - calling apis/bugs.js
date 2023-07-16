// actions
// In redux toolkit, action types are created by redux toolkit when we call createAction method

// In this version, we use createSlice method, which combines createAction and CreateReducer
// slice = actionTypes + actionCreators + reducer

import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

// create memoized selected for better performance
import { createSelector } from "reselect";
import { apiCallBegan } from "../api";

let initialState = {
  list: [],
  loading: false,
  lastFetch: null,
};

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: initialState,
  reducers: {
    bugAdded: (bugs, action) => {
      // when server post is not addded, adding hard coded data in redux
      // bugs.list.push({
      //   id: ++lastId,
      //   desc: action.payload.description,
      //   resolved: false,
      // });

      // data coming from server will be added to redux
      bugs.list.push(action.payload);
    },

    bugRemoved: (bugs, action) => {
      bugs.list.filter((bug) => bug.id !== action.payload.id);
    },

    bugResolved: (bugs, action) => {
      const bugToResolveId = bugs.list.findIndex((bug) => bug.id == action.payload.id);
      bugs.list[bugToResolveId].resolved = true;
    },

    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugAssignedToEmployee: (bugs, action) => {
      const { id: bugId, employeeId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id == bugId);
      bugs.list[index].employeeId = employeeId;
    },
  },
});

export const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugsRequested,
  bugsRequestFailed,
  bugsReceived,
  bugAssignedToEmployee,
} = slice.actions;
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

// ActionCreators - fetching data from server
const bugsList = "/bugs";

// this function logic is not handling cache, below one does
export const loadBugs = () => {
  apiCallBegan({
    url: bugsList,
    onStart: bugsRequested.type,
    onSucess: bugsReceived.type,
    onerror: bugsRequestFailed.type,
  });
};

export const loadBugs1 = () => (dispatch, getState) => {
  const { lastFetch } = getState().entites.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url: bugsList,
      onStart: bugsRequested.type,
      onSucess: bugsReceived.type,
      onerror: bugsRequestFailed.type,
    })
  );
};

// post call
export const addBug = (bug) => {
  apiCallBegan({
    url: bugsList,
    method: post,
    data: bug,
    onSucess: bugAdded.type,
  });
};

export const resolveBug = (id) => {
  apiCallBegan({
    url: bugsList + "/" + id,
    method: patch,
    data: { resolved: true },
    onSucess: bugResolved.type,
  });
};

export const assignBugToUser = (bugId, userId) => {
  apiCallBegan({
    url: bugsList + "/" + bugId,
    method: patch,
    data: { userId },
    onSucess: bugAssignedToEmployee.type,
  });
};

// addBug - command
// bugAdded - event

// reduce coupling: we should export only commands not events, if we do so, we will not save data to server but only to frontend app, so we should remove exports from slice.actions above.
// I am keeping it here, because I am writing code from start, so I might have used it outside, but we shouldnt do it in real world

// cohesion: things that are highly related should be inside same file that's why I am writing in this single file, otherwise if we split, we will need to export it, hence we will increase coupling in the system
