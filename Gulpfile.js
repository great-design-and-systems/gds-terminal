'use strict';
var SCANNER_PROTOCOL = process.env.SCANNER_PROTOCOL || 'https';
var SCANNER_HOST = process.env.SCANNER_HOST || 'gds-ms-api.herokuapp.com';
var SCANNER_PORT = process.env.SCANNER_PORT || '';
var SCANNER_CONTEXT = process.env.SCANNER_CONTEXT || '/gds/scanner/';
var CONFIG_PROTOCOL = process.env.CONFIG_PROTOCOL || '';
var CONFIG_HOST = process.env.CONFIG_HOST || '';
var CONFIG_PORT = process.env.CONFIG_PORT || '';
var CONFIG_CONTEXT = process.env.CONFIG_CONTEXT || '/gds/config/';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var htmlreplace = require('gulp-html-replace');
var replace = require('gulp-replace');
var appTasks = new require('./gulp-tasks/app-tasks')(gulp);
new require('./gulp-tasks/vendor-tasks')(gulp);

gulp.task('default', function() {
  runSequence('vendor-build', 'set-contant-values', 'app-build', 'html-prod');
});
gulp.task('debug', function() {
  runSequence('vendor-debug', 'set-contant-values', 'app-debug', 'html-dev');
})
gulp.task('html-dev', function() {
  return gulp.src('html-build/index.html')
    .pipe(htmlreplace({
      appJS: appTasks.SRC_JS,
      appCSS: 'dist/app.css',
      vendorJS: 'dist/vendors.js',
      vendorCSS: 'dist/vendors.css'
    }))
    .pipe(gulp.dest('.'));
})

gulp.task('html-prod', function() {
  return gulp.src('html-build/index.html')
    .pipe(htmlreplace({
      appJS: 'dist/release/app.js',
      appCSS: 'dist/release/app.css',
      vendorJS: 'dist/release/vendors.js',
      vendorCSS: 'dist/release/vendors.css'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('set-contant-values', function() {
  gulp.src(['html-build/app.constant.js'])
    .pipe(replace('#SCANNER_PROTOCOL', SCANNER_PROTOCOL))
    .pipe(replace('#SCANNER_HOST', SCANNER_HOST))
    .pipe(replace('#SCANNER_PORT', SCANNER_PORT))
    .pipe(replace('#SCANNER_CONTEXT', SCANNER_CONTEXT))
    .pipe(replace('#CONFIG_PROTOCOL', CONFIG_PROTOCOL))
    .pipe(replace('#CONFIG_HOST', CONFIG_HOST))
    .pipe(replace('#CONFIG_PORT', CONFIG_PORT))
    .pipe(replace('#CONFIG_CONTEXT', CONFIG_CONTEXT))
    .pipe(gulp.dest('src/app/'));
});