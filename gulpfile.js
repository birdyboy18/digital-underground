var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rubySass = require('gulp-ruby-sass');
	autoprefixer = require('gulp-autoprefixer'),
	csso = require('gulp-csso'),
	imagemin = require('gulp-imagemin'),
	browserify = require('gulp-browserify'),
	runSequence = require('run-sequence'),
	rename = require('gulp-rename');


gulp.task('sass', function() {
	return gulp.src('./src/sass/style.scss')
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(csso())
	.pipe(gulp.dest('../digital-underground/css/'));
});

gulp.task('dan-sass', function() {
	return rubySass('./src/sass/style.scss')
	.pipe(autoprefixer())
	.pipe(csso())
	.pipe(gulp.dest('../digital-underground/css/'));
});

gulp.task('scripts', function() {
	return gulp.src('./src/js/main.js')
	.pipe(browserify({
		insertGlobals : true,
	}))
	.pipe(rename({
		basename: 'bundle',
		extname: '.js'
	}))
	.pipe(gulp.dest('../digital-underground/js'));
});

gulp.task('copy', function() {
	return gulp.src('./src/**/*.*')
	.pipe(gulp.dest('../digital-underground/'));
});

gulp.task('sequence', function(cb){
	runSequence('scripts', 'copy', cb);
});

gulp.task('watch', function() {
	gulp.watch('./src/sass/**/*.scss', ['dan-sass']);
	gulp.watch('./src/views/**/*.twig', ['copy']);
	gulp.watch('./src/js/*.js', ['sequence']);
	gulp.watch('./src/*.php', ['copy']);
});

