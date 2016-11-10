var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var striptags = require('./strip-tags');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: ['./src/main.js'],
        other: ['./src/other.js'],
        vendor: ['jquery', 'vue', 'vue-router', 'vuex', 'echarts'],
        mvendor: ['jquery', 'vue', 'vue-router', 'vuex', 'fastclick'],
        bindTel: ['./src/m/bindTel.js'],
        student: ['./src/m/studentCenter/main.js'],
        teacher: ['./src/m/teacherCenter/main.js'],
        user: ['./src/m/userCenter/main.js'],
        selectStu: ['./src/m/selectStu.js'],
        notice: ['./src/m/notice.js']

    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue', 'scss', 'css'],
        alias: {
            'element-ui': path.join(__dirname, '../node_modules/element-ui'),
            'mint-ui': path.join(__dirname, '../node_modules/mint-ui'),
            'echarts': path.join(__dirname, '../node_modules/echarts')
        }
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
            loader: 'babel'
        }, {
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
            test: /\.(png|jpe?g|gif|svg|cur)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 30000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 30000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-vue-jsx', 'transform-runtime']
    }
}
