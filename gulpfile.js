var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	csso = require('gulp-csso'),
	imagemin = require('gulp-imagemin');


gulp.task('sass', function() {
	return gulp.src('./src/sass/style.scss')
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(csso())
	.pipe(gulp.dest('../digital-underground/css/'));
});

gulp.task('copy', function() {
	return gulp.src('./src/**/*.*')
	.pipe(gulp.dest('../digital-underground/'));
});

gulp.task('watch', function() {
	gulp.watch('./src/sass/**/*.scss', ['sass']);
	gulp.watch('./src/views/**/*.twig', ['copy']);
	gulp.watch('./src/*.php', ['copy']);
});

