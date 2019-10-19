const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/fe/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  resolve: {
    alias: {
      Characters: path.resolve(__dirname, 'src/fe/characters/'),
      Fx: path.resolve(__dirname, 'src/fe/fx/'),
      Assets: path.resolve(__dirname, 'src/fe/assets/'),
      Utils: path.resolve(__dirname, 'src/fe/utils/')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml|ogg|wav)$/i,
        use: "file-loader"
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()]
};