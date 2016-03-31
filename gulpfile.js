// gulpfile.js

var gulp = require('gulp');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');

gulp.task('app', function() {
	return gulp.src('./client/index.js')
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest('src'));
});

gulp.task('sass', function() {
	return gulp.src('./client/style.scss')
		.pipe(sass())
		.pipe(gulp.dest('src'));
});

gulp.task('build', ['app', 'sass'])