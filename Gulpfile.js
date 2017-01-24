'use strict';
var SCANNER_CONTEXT = process.env.SCANNER_CONTEXT || '/gds/timeServicePort/';
var CONFIG_CONTEXT = process.env.CONFIG_CONTEXT || '/gds/schoolConfigServicePort/';
var API_HOST = process.env.API_HOST || 'http://192.168.160.161:8080';
var SCHOOL_ID = process.env.SCHOOL_ID || '57a60c8d9b19871d0010f0dd'; //Assumption college idvar API_HOST = process.env.API_HOST || 'http://192.168.160.161:8080';// TODO: Find a way to dynamically adjust
var FILE_CONTEXT = process.env.EXPORT_CONTEXT || '/gds/fileServicePort/';

var git = require('gulp-git');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var htmlreplace = require('gulp-html-replace');
var replace = require('gulp-replace');
var appTasks = new require('./gulp-tasks/app-tasks')(gulp);
new require('./gulp-tasks/vendor-tasks')(gulp);
var bower = require('gulp-bower');
gulp.task('default', function () {
    runSequence('vendor-build', 'set-contant-values', 'app-build', 'html-prod');
});
gulp.task('debug', function () {
    runSequence('vendor-debug', 'set-contant-values', 'app-debug', 'html-dev');
});
gulp.task('html-dev', function () {
    return gulp.src('html-build/index.html')
        .pipe(htmlreplace({
            socket: API_HOST + '/socket.io/socket.io.js',
            appJS: appTasks.SRC_JS,
            appCSS: 'dist/app.css',
            vendorJS: 'dist/vendors.js',
            vendorCSS: 'dist/vendors.css'
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('html-prod', function () {
    return gulp.src('html-build/index.html')
        .pipe(htmlreplace({
            socket: API_HOST + '/socket.io/socket.io.js',
            appJS: 'dist/release/app.js',
            appCSS: 'dist/release/app.css',
            vendorJS: 'dist/release/vendors.js',
            vendorCSS: 'dist/release/vendors.css'
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('set-contant-values', function () {
    gulp.src(['html-build/app.constant.js'])
        .pipe(replace('#API_HOST', API_HOST))
        .pipe(replace('#SCANNER_CONTEXT', SCANNER_CONTEXT))
        .pipe(replace('#CONFIG_CONTEXT', CONFIG_CONTEXT))
        .pipe(replace('#SCHOOL_ID', SCHOOL_ID))
        .pipe(replace('#FILE_CONTEXT', FILE_CONTEXT))
        .pipe(gulp.dest('src/app/'));
});
// Run git pull from multiple branches 
gulp.task('pull', function () {
    git.pull('origin', ['master'], function (err) {
        if (err) throw err;
    });
});

gulp.task('bower', function () {
    return bower({ cmd: 'update' });
});