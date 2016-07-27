var gulp = require('gulp');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var SRC_JS = 'src/**/*.js';

gulp.task('default', function() {
    runSequence('jshint');
});

gulp.task('jshint', function() {
  return gulp.src(SRC_JS)
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }));
});