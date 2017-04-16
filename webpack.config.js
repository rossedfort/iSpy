const path = require('path');

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: "main.bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};
