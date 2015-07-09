var gulp = require('gulp');
var sass = require ('gulp-sass');
var concat = require ('gulp-concat');
var notify = require("gulp-notify");
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('styles', function (){
	return gulp.src('sass/**/*.scss')
			.pipe(sass({
			'sourcemap=none': true,
			errLogToConsole: true
				}))
			.on("error", notify.onError(function (error) {
			return "Message to the notifier: " + error.message;
 				}))
			.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
			.pipe(concat('css/style.css'))
			.pipe(gulp.dest('./'))
			.pipe(notify('Sass done'))
			.pipe(reload({stream:true}));
});

gulp.task('watch',function(){
	gulp.watch('sass/**/*.scss',['styles']);
	//gulp.watch('js/*.js', ['jshint']);
	//gulp.watch('index.html', ['bs-reload']);
});

// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "localhost:8080",
//         open: false
//     });
// });

// gulp.task('bs-reload', function(){
// 	browserSync.reload();
// });

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// gulp.task('jshint', function(){
// 	return gulp.src('js/*.js')
// 		.pipe(jshint())
// 	});

//gulp.task('default', ['jshint', 'styles', 'watch', 'browser-sync']);

gulp.task('default', ['styles', 'watch', 'browser-sync']);