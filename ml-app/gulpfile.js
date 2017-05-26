var gulp = require('gulp') 
var sass = require('gulp-sass')
var uglify = require('gulp-uglify') 
var cache = require('gulp-cache') 
var concat = require('gulp-concat') 
var imagemin = require('gulp-imagemin')
var cssnano = require('gulp-cssnano')
var autoprefixer = require('autoprefixer')
var postcss = require('gulp-postcss')
var runSequence = require('run-sequence')
var del = require('del') 

gulp.task('clean:public', () => {
	return del.sync('public')
})

gulp.task('sass', () => {
	return gulp.src('dev/sass/blocks/*.scss')
		.pipe(sass().on('error', sass.logError)) 
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('./public/css'))
})

gulp.task('css', () => {
	let plugins = [
		autoprefixer({browsers: ['last 2 versions']}),
		cssnano
	]
	return gulp.src('public/css/styles.css')
		.pipe(postcss(plugins))
		.pipe(gulp.dest('public/css'))
})

gulp.task('images', () => {
	return gulp.src('dev/images/**/*.+(png|jpg|jpeg)')
		.pipe(cache(imagemin()))
		.pipe(gulp.dest('public/images'))
})

gulp.task('watch', ['sass'], () => {
	gulp.watch('dev/sass/blocks/*.scss',['sass'])
})

gulp.task('default', (callback) => {
	runSequence(
		['sass','watch'],
		callback
	)
})

gulp.task('build', (callback) => { 
	runSequence(
		'clean:public',
		'sass',
		'css',
		'images',
		callback
	) 	
})
