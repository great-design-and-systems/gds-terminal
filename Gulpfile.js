var gulp = require('gulp');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var SRC_JS = 'src/**/*.js';
var LIB_JS = [
  'bower_components/angular/angular.js',
  'bower_components/angular-resource/angular-resource.js',
  'bower_components/angular-ui-router/release/angular-ui-router.js',
  'bower_components/bootstrap/dist/js/bootstrap.js',
  'bower_components/jquery/dist/jquery.js',
  'bower_components/socket.io-client/socket.io.js'
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

gulp.task('scripts', function() {
  return gulp.src(LIB_JS)
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('./dist/'));
});