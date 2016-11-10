/**
 * @fileOverview webpack配置文件
 * @author xuguanlong
 */

'use strcit';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        main: ['./src/main.js'],
        login: ['./src/login.js'],
        vendor: ['jquery', 'vue', 'vue-router', 'vuex', 'fastclick'],
        student: ['./src/m/studentCenter/main.js'],
        teacher: ['./src/m/teacherCenter/main.js']
    },
    debug: true,
    output: {
        path: __dirname + '/output/src/',
        publicPath: '/src/',
        filename: '[name].[chunkhash:8].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue', 'scss', 'css'],
        alias: {
            'element-ui': path.join(__dirname, '../../node_modules/element-ui'),
            'mint-ui': path.join(__dirname, '../../node_modules/mint-ui')
        }
    },
    plugins: [
        new ProgressBarPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.[chunkhash:8].js'
        }),
        new ExtractTextPlugin('resource/css/[name].[contenthash:8].css'),
        new HtmlWebpackPlugin({  // Also generate a test.html
            inject: 'body',
            filename: '../index.html',
            minify: { removeAttributeQuotes: true, collapseWhitespace: true, minifyJS: true, minifyCSS: true },
            template: 'main.html',
            chunks: ['main', 'vendor']
        })

    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel'
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.css$/,
                // loader: "style-loader!css-loader?root=."
                loader: ExtractTextPlugin.extract("style", "css")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style", 'css!sass')
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url'
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf|cur)([\?]?.*)$/, 
                loader: "file",
            }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-vue-jsx', 'transform-runtime']
    }
}