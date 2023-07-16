import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "../middleware/logger";
import func from "../middleware/func";
import toast from "../middleware/toastError";

export default function () {
  // return configureStore({ reducer, middleware: [logger] });

  // passing params to middleware
  // return configureStore({ reducer, middleware: [logger({ destination: "console" })] });

  // adding ability to dispatch functions,
  // return configureStore({ reducer, middleware: [logger({ destination: "console" }), func] });

  // builtin solution to add ability of dispathcing functions
  // return configureStore({
  //   reducer,
  //   middleware: [...getDefaultMiddleware(), logger({ destination: "console" })],
  // });

  // adding middleware for toast notification error
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), logger({ destination: "console" }), toast],
  });
}
