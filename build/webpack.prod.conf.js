var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var pages = require('../config/pages');

var env = process.env.NODE_ENV === 'testing' ? require('../config/test.env') : config.build.env

var webpackConfig = merge(baseWebpackConfig, {

    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        new ProgressBarPlugin(),
        // http://vuejs.github.io/vue-loader/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        // extract css into its own file
        new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash:8].css')),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            },
            chunks: ["main"]
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'mvendor',
            minChunks: function(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            },
            chunks: ["login", "student", "teacher", "user"]
        })
    ]
})

if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

for (var chunkname in pages.pc) {
    var conf = {
        favicon: 'favicon.ico',
        filename: chunkname + '.html',
        template: pages.pc[chunkname],
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency',
        chunks: ['vendor', chunkname]
    }
    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}
for (var chunkname in pages.m) {
    var conf = {
        favicon: 'favicon.ico',
        filename: chunkname + '.html',
        template: pages.m[chunkname],
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency',
        chunks: ['mvendor', chunkname]
    }
    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

for (var chunkname in pages.other) {
    var conf = {
        favicon: 'favicon.ico',
        filename: chunkname + '.html',
        template: pages.other[chunkname],
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunks: ['other']
    }
    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

webpackConfig.plugins.push(new CopyWebpackPlugin(
    [
        { from: 'area.html' }, 
        { from: 'china.html' },
        { from: 'favicon.ico'}
    ]
));

module.exports = webpackConfig
