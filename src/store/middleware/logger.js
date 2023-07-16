// export default logger = (store) => (next) => (action) => {
//   console.log("store ", store);
//   console.log("next ", next);
//   console.log("action ", action);

//   next();
// };

// if you are passing parameters to middle, use this approach
export default logger = (params) => (store) => (next) => (action) => {
  console.log("params ", params);
  console.log("store ", store);
  console.log("next ", next);
  console.log("action ", action);

  next();
};
