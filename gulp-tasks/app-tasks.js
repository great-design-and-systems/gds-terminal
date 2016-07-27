'use strict';

var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var pump = require('pump');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var jshint = require('gulp-jshint');
var angularTemplates = require('gulp-angular-templates');

var SRC_JS = [
  'src/app/app.module.js',
  'src/app/app.constant.js',
  'src/app/app.route.js',
  'src/app/app.vendor.js',
  'src/app/app.clock.directive.js',
  'src/bar-code/bar-code-resource.service.js',
  'src/bar-code/bar-code.component.js',
  'src/home/home.component.js',
  'src/purpose/purpose-resource.service.js',
  'src/scanner/scanner.service.js',
  'src/time-in/time-in.service.js',
  'src/time-in/time-in.component.js'
];



var SASS_INDEX = 'src/app.scss';

var SRC_SASS = 'src/**/*.scss';

module.exports = function(gulp) {
  gulp.task('jshint', function() {
    return gulp.src(SRC_JS)
      .pipe(jshint())
      .pipe(jshint.reporter('default', {
        verbose: true
      }));
  });
  gulp.task('sass', function() {
    return gulp.src(SASS_INDEX)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist'));
  });
  gulp.task('sass:watch', function() {
    gulp.watch(SRC_SASS, ['sass']);
  });
  gulp.task('app-build', function() {
    runSequence('jshint', 'sass', 'app-template', 'app-concat-scripts', 'app-concat-templates', 'app-compress-scripts', 'app-compress-css');
  });
  gulp.task('app-debug', function() {
    runSequence('jshint', 'sass');
  });
  gulp.task('app-concat-scripts', function() {
    return gulp.src(SRC_JS)
      .pipe(concat('app.js'))
      .pipe(gulp.dest('./dist/'));
  });

  gulp.task('app-concat-templates', function() {
    return gulp.src(['dist/app.js', 'dist/templates/**/*.js'])
      .pipe(concat('app.js'))
      .pipe(gulp.dest('dist'));
  });
  gulp.task('app-compress-scripts', function(cb) {
    pump([
      gulp.src('dist/app.js'),
      uglify({
        mangle: false
      }),
      gulp.dest('dist/release')
    ], cb);
  });
  gulp.task('app-compress-css', function(cb) {
    return gulp.src('./dist/app.css')
      .pipe(uglifycss({
        "maxLineLen": 80,
        "uglyComments": true
      }))
      .pipe(gulp.dest('./dist/release'));
  });
  gulp.task('app-template', function() {
    return gulp.src('src/**/*.html')
      .pipe(angularTemplates({
        module: 'gdsApp',
        standalone: false
      }))
      .pipe(gulp.dest('dist/templates'));
  });
  return {
    SRC_JS: SRC_JS
  };
}