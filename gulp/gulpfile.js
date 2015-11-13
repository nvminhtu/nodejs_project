var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var path = require('path'),
	  autoprefixer = require('gulp-autoprefixer'),
	  minifycss = require('gulp-minify-css'),
	  jshint = require('gulp-jshint'),
	  uglify = require('gulp-uglify'),
	  imagemin = require('gulp-imagemin'),
	  rename = require('gulp-rename'),
	  concat = require('gulp-concat'),
	  notify = require('gulp-notify'),
	  del = require('del'),
	  cache = require('gulp-cache');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("src/styles/scss/*.scss", ['sass']);
	  gulp.watch('src/images/**/*', ['images']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

//compress images
gulp.task('images', function() {
	return gulp.src('src/images/**/*')
	  .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
	  .pipe(gulp.dest('dist/assets/img'))
	  .pipe(notify({ message: 'Images task complete' }));
});

//build sass files
gulp.task('styles', function() {
return sass('src/styles/scss/main.scss', { style: 'expanded' })
  .pipe(autoprefixer('last 2 version'))
  .pipe(gulp.dest('dist/assets/css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('dist/assets/css'))
  .pipe(notify({ message: 'Styles task complete' }));
});

//clean out destination folders and rebuild files
gulp.task('clean', function() {
  return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("src/styles/scss/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("src/styles/css"))
      .pipe(browserSync.stream());
});

//collect all tasks and rebuild - this default run when call gulp
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'images', 'serve');
});