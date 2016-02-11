/**
 * Created by danle on 1/29/16.
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer');

gulp.task('JSTask', function () {
    return gulp
        .src('./src/public/**/*.js')
        .pipe(concat('build.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/public'))
});

gulp.task('SassTask', function () {
    return gulp
        .src('./src/public/assets/*.scss')
        .pipe(concat('styles.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix({browsers: ['last 2 version', '>5%']}))
        .pipe(gulp.dest('./build/public'))
});
//gulp auto prefixer
gulp.task('CopyHtml', function () {
    return gulp
        .src('./src/public/**/*.html')
        .pipe(gulp.dest('./build/public'));
});

gulp.task('JServerTask', function () {
    return gulp
        .src('./src/server/**/*.js')
        .pipe(gulp.dest('./build/server'))
});

gulp.task('Build', ['JSTask', 'SassTask', 'CopyHtml', 'JServerTask'], function () {
    console.log('building all the stuff');
});

gulp.task('default', function () {
    gulp.watch(['./src/**/*'], ['Build']);
});