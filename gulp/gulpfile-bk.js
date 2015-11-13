var 
		gulp = require('gulp'),
		less = require('gulp-less'),
		path = require('path'),
		sass = require('gulp-sass'),
	  sass = require('gulp-ruby-sass'),
	  autoprefixer = require('gulp-autoprefixer'),
	  minifycss = require('gulp-minify-css'),
	  jshint = require('gulp-jshint'),
	  uglify = require('gulp-uglify'),
	  imagemin = require('gulp-imagemin'),
	  rename = require('gulp-rename'),
	  concat = require('gulp-concat'),
	  notify = require('gulp-notify'),
	  cache = require('gulp-cache'),
	  livereload = require('gulp-livereload'),
	  del = require('del'),
	  var browserSync = require('browser-sync').create();

	//build less files
	gulp.task('less', function () {  
	  return gulp.src('./less/**/*.less')
	    .pipe(less({
	      paths: [ path.join(__dirname, 'less', 'includes') ]
	    }))
	    .pipe(gulp.dest('./css'));
	});
	
	//build sass files
	gulp.task('styles', function() {
  return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
	});

	//compress images
	gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
	});

	//clean out destination folders and rebuild files
	gulp.task('clean', function() {
    return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
	});

	//collect all tasks and rebuild - this default run when call gulp
	gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'less');
	});


	//watch changed files
	gulp.task('watch', function() {
		
		// Watch .scss files
	  gulp.watch('src/styles/**/*.scss', ['styles']);

	  // Watch .less files
	  gulp.watch('src/styles/**/*.less', ['styles']);

	  // Watch .js files
	  gulp.watch('src/scripts/**/*.js', ['scripts']);

	  // Watch image files
	  gulp.watch('src/images/**/*', ['images']);
	});

  //live reload on change
  gulp.task('watch', function() {
		
		// Create LiveReload server
	  livereload.listen();
		
		// Watch any files in dist/, reload on change
	  gulp.watch(['dist/**']).on('change', livereload.changed);
	});

});