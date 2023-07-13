const path = require("path");

module.exports = {
  entry: "./src/ver1 - simple/index.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9001,
  },
  mode: "development",
};
