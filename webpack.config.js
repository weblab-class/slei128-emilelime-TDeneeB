const path = require('path');
const entryFile = path.resolve(__dirname, 'client', 'src', 'index.js');
const outputDir = path.resolve(__dirname, 'client', 'dist');

const webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', entryFile],
  output: {
    publicPath:"/",
    filename: 'bundle.js',
    path: outputDir
  },
  module: {
    rules: [

      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './client/dist',
    watchOptions: {poll: true},
    hot: true,
    proxy: {
      '/api': 'http://localhost:3000',
      '/game': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
      '/logout': 'http://localhost:3000',
      '/socket.io': {
        target: 'http://localhost:3000', ws: true
      }
    }
  }
};
