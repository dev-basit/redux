const toast = (store) => (next) => (action) => {
  if ((action.type = "error")) console.log("Toastify: ", action.payload.message);
  else next();
};

export default toast;