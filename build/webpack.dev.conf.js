var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//var SwigWebpackPlugin = require('swig-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var pages = require('../config/pages');
var path = require('path');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
var devPlugins = [
    new ProgressBarPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        filename: "vendor.js",
        chunks: ["main"]
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: "mvendor",
        filename: "mvendor.js",
        chunks: ["login", "student", "teacher", "user"]
    }),
    new webpack.DefinePlugin({
        'process.env': config.dev.env
    }),
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash:8].css')),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
]

for (var chunkname in pages.pc) {
    console.log(chunkname);
    var conf = {
        favicon: 'favicon.ico',
        filename: chunkname + '.html',
        template: pages.pc[chunkname],
        inject: true,
        chunks: ['vendor', chunkname]
    }
    devPlugins.push(new HtmlWebpackPlugin(conf));
}
for (var chunkname in pages.m) {
    console.log(chunkname);
    var conf = {
        favicon: 'favicon.ico',
        filename: chunkname + '.html',
        template: pages.m[chunkname],
        inject: true,
        chunks: ['mvendor', chunkname]
    }
    devPlugins.push(new HtmlWebpackPlugin(conf));
}

for (var chunkname in pages.other) {
    var conf = {
        favicon: 'favicon.ico',
        filename: chunkname + '.html',
        template: pages.other[chunkname],
        inject: true,
        chunks: ['other']
    }
    devPlugins.push(new HtmlWebpackPlugin(conf));
}

devPlugins.push(new CopyWebpackPlugin(
    [
        { from: 'area.html' }, 
        { from: 'china.html' },
        { from: 'favicon.ico'}
    ]
));

module.exports = merge(baseWebpackConfig, {
    // eval-source-map is faster for development
    //devtool: '#eval-source-map',
    plugins: devPlugins
})
