var gulp = require('gulp') 
var sass = require('gulp-sass')
var uglify = require('gulp-uglify') 
var gulpIf = require('gulp-if') 
var cache = require('gulp-cache') 
var concat = require('gulp-concat') 
var imagemin = require('gulp-imagemin')
var cssnano = require('gulp-cssnano')
var autoprefixer = require('autoprefixer')
var postcss = require('gulp-postcss')
var runSequence = require('run-sequence')
var del = require('del') 
var browserSync = require('browser-sync').create() 

/*gulp.task('browserSync', () => {
	browserSync.init({
		server: {
			baseDir: './'
		}
	})
})
*/	
gulp.task('clean:public', () => {
	return del.sync('public')
})



gulp.task('sass', () => {
	return gulp.src('dev/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError)) 
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('./public/css'))
		//.pipe(browserSync.reload({ stream: true}))
})

gulp.task('images', () => {
	return gulp.src('dev/images/**/*.+(png|jpg|jpeg)')
		.pipe(cache(imagemin()))
		.pipe(gulp.dest('public/images'))
})

gulp.task('watch', [/*'browserSync',*/ 'sass'], () => {
	gulp.watch('dev/sass/**/*.scss',['sass'])
	//gulp.watch('**/*.js', browserSync.reload)
	//gulp.watch('**/*.handlebars', browserSync.reload)
})

gulp.task('default', (callback) => {
	runSequence(
		['sass'/*,'browserSync'*/,'watch'],
		callback
	)
})

gulp.task('build', (callback) => { 
	runSequence(
		'clean:public',
		'sass',
		'images',
		callback
	) 	
})
