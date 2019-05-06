const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  mode:'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs')
  },
  resolve: {
    alias: {
      heros: path.resolve(__dirname, 'src/heros/')
    }
  },
  plugins: [
    new CopyWebpackPlugin([
        {from: './src/html/**/*', to:'', flatten: true},
        {from: './src/css/**/*', to:'', flatten: true},
        {from: './vendor/**/*', to:'', flatten: true},
        {from: './assets/img/**/*', to: ''},
        {from: './assets/audio/**/*', to: ''},
        {from: './assets/levels/**/*', to: ''}
    ])
  ]
};
