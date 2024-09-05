const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    act3xmc: './public/a3/act3xmc.js',
    act5xmc: './public/a5/act5xmc.js',
    act6xmc: './public/a6/act6xmc.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js',
  },
  resolve: {
    fallback: {
      "url": require.resolve("url/"),
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify"),
      "process": require.resolve("process/browser"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  mode: 'development',
  devtool: false,
};
