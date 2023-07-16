import { createSelector, createSlice } from "@reduxjs/toolkit";

let employees = [];
let lastId = 0;

const slice = createSlice({
  name: "employees",
  initialState: employees,
  reducers: {
    employeAdded: (employees, action) => {
      employees.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

export const { employeAdded, assignBug } = slice.actions;
export default slice.reducer;
