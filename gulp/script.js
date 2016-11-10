/**
 * @fileOverview resolve script
 * @author XiaoBin Li
 */

'use strict';

var gulp = require('gulp');
var config = require('./config/webpack.prod');
var webpack = require('gulp-webpack');
var entry = require('./config/entry');
var underscore = require('underscore');

gulp.task('common', function () {
    return gulp
        .src(['./src/common/**/*.js', './src/common/**/*.vue'])
        .pipe(gulp.dest('./output/src/common'));
});

gulp.task('script', function () {
    return gulp
        .src('./src/main.js')
        .pipe(webpack(config))
        .pipe(gulp.dest('./output/src'));
});
