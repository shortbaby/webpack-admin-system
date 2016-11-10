/**
 * @fileOverview pack
 * @author xgl
 */

'use strict';

var gulp = require('gulp');
var config = require('./config/webpack.prod');
var webpack = require('gulp-webpack');
var clean = require('gulp-clean');

var output = process.cwd() + '/output';

gulp.task('clean', function () {
    return gulp.src(output, {read: true}).pipe(clean())
});

gulp.task('pack', ['clean'], function () {
    return gulp
        .src('./src/main.js')
        .pipe(webpack(config))
        .pipe(gulp.dest('./output/src'));
});
