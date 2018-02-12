const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /(\.js$|\.jsx$)/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /(\.css|\.scss)$/,
        loaders: ['style-loader', 'css-loader?modules', 'sass-loader?sourceMap']
      }
    ]
  }
}

