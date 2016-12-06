module.exports = {
  context: __dirname + "/app/assets/javascripts/components",

  entry: './main.js',

  output: {
    filename: "dist-app.js",
    path: __dirname + "/app/assets/javascripts",
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
        loaders: ["style","css?sourceMap"]
      }
    ],
  }
}
