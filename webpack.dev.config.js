var bourbon = require('node-bourbon').includePaths;
var neat = require('node-neat').includePaths;
bourbon = bourbon.concat(neat);

module.exports = {
  context: __dirname + "/webpack_dev",

  entry: {
    javascript: "./app.js",
    html: "./index.html"
  },

  output: {
    filename: "app.js",
    path: __dirname + "/webpack_dist",
    publicPath: "/"
  },

  devtool: "source-map",
  module: {
    // js? files run through babel to support jsx and es2015 minimum
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap&includePaths[]=" + bourbon + neat[0] + '&includePaths[]=' + neat[1]]
      }
    ],
  }
}
