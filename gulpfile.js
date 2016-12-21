const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('public', () => {
    return gulp
        .src('./src/public/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./build/public'))
});

gulp.task('html', () => {
    return gulp
        .src('./src/public/**/*.html')
        .pipe(gulp.dest('./build/public'))
});

gulp.task('css', () => {
    return gulp
        .src('./src/public/assets/**/*.css')
        .pipe(gulp.dest('./build/public'))
});

gulp.task('Build', ['public', 'html', 'css'], () => {
    console.log('Building all the stuff');
});

gulp.task('default', () => {
    gulp.watch(['./src/**/*'], ['Build']);
});