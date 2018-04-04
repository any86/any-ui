'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var rename = require("gulp-rename");

gulp.task('css', function() {
    return gulp.src('./src/scss/global.scss')
        .pipe(sass.sync())
        .pipe(autoprefixer({
            browsers: ['ie > 9', 'last 2 versions'],
            cascade: false
        }))
        .pipe(rename('atom.ui.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(cssmin())
        .pipe(rename('atom.ui.min.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('copyfont', function() {
    return gulp.src('./src/fonts/**')
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('build', ['css']);