const Path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: Path.resolve(__dirname, '../src/scripts/index.js'),
    secondary: Path.resolve(__dirname, '../src/scripts/secondary.js'),
    ternary: Path.resolve(__dirname, '../src/scripts/ternary.js'),
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: Path.resolve(__dirname, '../public'),
        to: 'public'
      }]
    }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/views/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'views/secondary.html',
      template: './src/views/secondary.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'views/ternary.html',
      template: './src/views/ternary.html'
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [{
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
};