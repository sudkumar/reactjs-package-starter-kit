const path = require('path');
const fs = require('fs-extra');
const url = require('url');
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const env = process.env.NODE_ENV || "development"

const appDirectory = fs.realpathSync(process.cwd());
const envPublicUrl = process.env.PUBLIC_URL
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;
function ensureSlash(inputPath, needsSlash) {
  const hasSlash = inputPath.endsWith('/')
  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1)
  } else if (!hasSlash && needsSlash) {
    return `${inputPath}/`
  } else {
    return inputPath
  }
}
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson)
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/')
  return ensureSlash(servedUrl, true)
}

const servedPath = getServedPath(resolveApp('package.json'))
const appIndexJs = resolveApp('gh-pages/main.js')
const appHtml = resolveApp('gh-pages/index.html')
const appBuild = resolveApp('docs')
const publicPath = env === "development" ? '/' : servedPath

console.log(publicPath)

const plugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: appHtml,
    hash: false,
    filename: "index.html",
    inject: "body",
    minify: {
      collapseWhitespace: true,
      removeComments: true
    },
  }),
  new HardSourceWebpackPlugin(),
]

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      appIndexJs,
    ],
  },
  mode: env,
  output: {
    publicPath,
    path: appBuild,
    filename: `[name].[hash].js`,
    chunkFilename: "[chunkhash].js"
  },

  module: {
    rules: [{
      test: /\.js/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader"
      }]
    }]
  },

  resolve: {
    extensions: ['.js']
  },

  plugins,

  devServer: {
    hot: true,
    contentBase: appBuild,
    open: true,
  }
};
