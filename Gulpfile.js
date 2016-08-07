'use strict';
var SCANNER_CONTEXT = process.env.SCANNER_CONTEXT || '/gds/timeServicePort/';
var CONFIG_CONTEXT = process.env.CONFIG_CONTEXT || '/gds/schoolConfigServicePort/';
var API_HOST = process.env.API_HOST || 'https://gds-ms-api.herokuapp.com';
var SCHOOL_ID = process.env.SCHOOL_ID || '57a60c8d9b19871d0010f0dd'; //Assumption college id

var gulp = require('gulp');
var runSequence = require('run-sequence');
var htmlreplace = require('gulp-html-replace');
var replace = require('gulp-replace');
var appTasks = new require('./gulp-tasks/app-tasks')(gulp);
new require('./gulp-tasks/vendor-tasks')(gulp);

gulp.task('default', function () {
  runSequence('vendor-build', 'set-contant-values', 'app-build', 'html-prod');
});
gulp.task('debug', function () {
  runSequence('vendor-debug', 'set-contant-values', 'app-debug', 'html-dev');
})
gulp.task('html-dev', function () {
  return gulp.src('html-build/index.html')
    .pipe(htmlreplace({
      appJS: appTasks.SRC_JS,
      appCSS: 'dist/app.css',
      vendorJS: 'dist/vendors.js',
      vendorCSS: 'dist/vendors.css'
    }))
    .pipe(gulp.dest('.'));
})

gulp.task('html-prod', function () {
  return gulp.src('html-build/index.html')
    .pipe(htmlreplace({
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
    .pipe(gulp.dest('src/app/'));
});