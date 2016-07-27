var gulp = require('gulp');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var pump = require('pump');
var uglify = require('gulp-uglify');

var SRC_JS = [
  'src/app/app.module.js',
  'src/**/*.js'
];
var SASS_INDEX = 'src/app.scss';
var SRC_SASS = 'src/**/*.scss';

var LIB_JS = [
  'bower_components/angular/angular.js',
  'bower_components/angular-resource/angular-resource.js',
  'bower_components/angular-ui-router/release/angular-ui-router.js',
  'bower_components/bootstrap/dist/js/bootstrap.js',
  'bower_components/jquery/dist/jquery.js',
  'bower_components/socket.io-client/socket.io.js'
];

var LIB_CSS = [
  'bower_components/bootstrap/dist/css/bootstrap.css'
];

gulp.task('default', function() {
  runSequence('jshint');
});

gulp.task('jshint', function() {
  return gulp.src(SRC_JS)
    .pipe(jshint())
    .pipe(jshint.reporter('default', {
      verbose: true
    }));
});

gulp.task('vendor-build', function() {
  runSequence('scripts', 'css');
});

gulp.task('compress', function(cb) {
  pump([
    gulp.src('dist/*.js'),
    uglify(),
    gulp.dest('dist')
  ], cb);
});

gulp.task('scripts', function() {
  return gulp.src(LIB_JS)
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('css', function() {
  return gulp.src(LIB_CSS)
    .pipe(concat('vendors.css'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function() {
  return gulp.src(SRC_SASS)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/app.css'));
});

gulp.task('sass:watch', function() {
  gulp.watch(SRC_SASS, ['sass']);
});