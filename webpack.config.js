const path = require('path');

module.exports = {
  entry: {
    dist: './src/index.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'draw.js'
  },
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    compress: true,
  },
  mode: 'development'
};
