var gulp = require('gulp');
var sass = require ('gulp-sass');
var concat = require ('gulp-concat');
var notify = require("gulp-notify");
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function (){
	return gulp.src('sass/**/*.scss')
			.pipe(sass({
			'sourcemap=none': true,
			errLogToConsole: true
				}))
			.on("error", notify.onError(function (error) {
			return "Message to the notifier: " + error.message;
 				}))
			.pipe(concat('style.css'))
			.pipe(gulp.dest('./'))
			.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
});

gulp.task('jshint', function() {
	return gulp.src('js/*.js')
		.pipe(jshint());
});

gulp.task('default', function () {
    return gulp.src('src/app.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default',function(){
	gulp.watch('sass/**/*.scss',['styles']);
	gulp.watch('js/*.js', ['jshint']);
});