
const webpack = require('webpack');
var path = require('path')
var ZipPlugin = require('zip-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/src'),
    filename: 'app.bundle.js',
    publicPath: '/public/'
  },
  devtool: "#eval-source-map",
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react']
      }
    },
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules', './node_modules/grommet/node_modules']
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new ZipPlugin({
      // OPTIONAL: defaults to the Webpack output path (above) 
      // can be relative (to Webpack output path) or absolute 
      path: 'zip',

      // OPTIONAL: defaults to the Webpack output filename (above) or, 
      // if not present, the basename of the path 
      filename: 'audit_app.zip',

      // OPTIONAL: defaults to 'zip' 
      // the file extension to use instead of 'zip' 
      extension: 'zip',

      // OPTIONAL: defaults an empty string 
      // the prefix for the files included in the zip file 
      pathPrefix: '',

      // OPTIONAL: defaults to including everything 
      // can be a string, a RegExp, or an array of strings and RegExps 
      include: [/\.js$/],

      // OPTIONAL: defaults to excluding nothing 
      // can be a string, a RegExp, or an array of strings and RegExps 
      // if a file matches both include and exclude, exclude takes precedence 
      exclude: [/\.png$/, /\.html$/],

      // yazl Options 

      // OPTIONAL: see https://github.com/thejoshwolfe/yazl#addfilerealpath-metadatapath-options 
      fileOptions: {
        mtime: new Date(),
        mode: 0o100664,
        compress: true,
        forceZip64Format: false,
      },

      // OPTIONAL: see https://github.com/thejoshwolfe/yazl#endoptions-finalsizecallback 
      zipOptions: {
        forceZip64Format: false,
      },
    })
  ]
};