var gulp = require('gulp') 
var sass = require('gulp-sass')
var uglify = require('gulp-uglify') 
var cache = require('gulp-cache') 
var concat = require('gulp-concat') 
var imagemin = require('gulp-imagemin')
var cssnano = require('gulp-cssnano')
var autoprefixer = require('autoprefixer')
var postcss = require('gulp-postcss')
var babel = require('gulp-babel')
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

gulp.task('js', () => {
	return gulp.src('dev/js/*.js')
		.pipe(concat('script.js'))
		//.pipe(babel({ presets: ['es2015'] }))
		//.pipe(uglify())
		.pipe(gulp.dest('public/js'))
})

gulp.task('images', () => {
	return gulp.src('dev/images/**/*.+(png|jpg|jpeg)')
		.pipe(cache(imagemin()))
		.pipe(gulp.dest('public/images'))
})

gulp.task('watch', ['sass','js'], () => {
	gulp.watch('dev/sass/blocks/*.scss',['sass'])
	gulp.watch('dev/js/*.js',['js'])
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
