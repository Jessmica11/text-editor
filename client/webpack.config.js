const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // HTMLWebpackPlugin to generate HTML files
      new HtmlWebpackPlugin({
        template: './src/index.html',
        chunks: ['main'],
      }),
      // WebpackPwaManifest to generate a manifest file
      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'sw.js',
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'Text Editor',
        description: 'Just another text editor application',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
// TODO: Add CSS loaders and babel to webpack.
    module: {
      rules: [
        // CSS
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },

        // Babel
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
  };
};
