const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { webpack } = require('webpack');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = async (_, { mode = 'development' }) => {
  return {
    entry: path.join(__dirname, 'src', 'index.ts'),
    target: 'web',
    mode,
    devtool: 'inline-source-map',
    output: {
      path: path.join(__dirname, 'build'),
      publicPath: 'auto',
      chunkFilename: 'js/[id].[contenthash].js',
      filename: 'js/[name].[contenthash].js',
      clean: true,
    },
    devServer: {
      hot: true,
      open: true,
      historyApiFallback: true,
      compress: true,
      port: 3000,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
      }),
      new ModuleFederationPlugin({
        name: 'HostApp',
        filename: 'js/host-app-entry.js',
        shared: [
          {
            react: {
              requiredVersion: '^18.2.0',
              singleton: true,
              eager: true,
            },
            'react-dom': {
              requiredVersion: '^18.2.0',
              singleton: true,
              eager: true,
            },
            'react-router-dom': {
              requiredVersion: '^6.3.0',
              singleton: true,
              eager: true,
            },
          } 
        ],
        remotes: {
          'remote': 'RemoteApp@http://localhost:3001/js/remote-app-entry.js'
        }
      })
    ],
  };
};
