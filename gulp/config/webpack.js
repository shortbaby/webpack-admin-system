/**
 * @fileOverview webpack配置文件
 * @author xuguanlong
 */

'use strcit';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
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
        publicPath: '/output/src/',
        filename: '[name].js',
        chunkFilename: "[name].js",
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            'element-ui': path.join(__dirname, '../../node_modules/element-ui'),
            'mint-ui': path.join(__dirname, '../../node_modules/mint-ui')
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js"
        }),
        new ExtractTextPlugin("vendor.css")
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
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url'
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, 
                loader: "file",
            }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-vue-jsx', 'transform-runtime']
    }
}