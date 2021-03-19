const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputPath = path.resolve(__dirname, '..', 'dist', 'ethereum-dapp-demo');

module.exports = {
  target: "web",
  node: {
    fs: 'empty'
  },
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                "targets": {
                  "node": "10"
                }
              }
            ],
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties"
          ]
        },
      },
      {
        test: /\.yaml$/,
        use: [
          { loader: 'json-loader' },
          { loader: 'yaml-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([
      outputPath
    ]),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: outputPath,
  }
};
