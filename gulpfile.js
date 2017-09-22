var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
// var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-clean');

var concatCss = require('gulp-concat-css');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

// var install = require("gulp-install");

// gulp.task('default', ['scripts', 'less', 'minify-css'], function() {});
gulp.task('default', ['less', 'scripts', 'minify-css'], function() {});

gulp.task('scripts', function() {
  return gulp.src(['web-src/js/*.js', 'view/**/*.js'])
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('content/js/'));
});

gulp.task('minify-css', ['clean-style'], function() {
    return gulp.src('content/css/**/*.css')
        .pipe(concatCss('style.min.css'))
        // .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('content/css/min'));
});

gulp.task('less', function () {
  return gulp.src('web-src/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('content/css'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch(['web-src/less/**/*.less', 'view/**/*.*', 'web-src/js/**/*.*'], ['default']);
});

// Delete style
gulp.task('clean-style', function () {
  return gulp.src('content/css/min/*.css', {read: false})
    .pipe(clean());
});

// Server
gulp.task('server', ['default'], function() {

    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false
    });

    gulp.watch(['web-src/less/**/*.less', 'view/**/*.*', 'web-src/js/**/*.*'], ['default']).on('change', browserSync.reload);
});


// Install
// gulp.task('install', function () {
//   return gulp.src(['./package.json'])
//     .pipe(install());
// });
