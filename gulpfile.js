

if (global.Promise == null) {
    global.Promise = require('es6-promise')
}

var options = {};

options.autoprefixer = {
  map: true,
  from: 'asset',
  to: 'asrp.min.css'
};


var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    imageop = require('gulp-image-optimization'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),	
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('styles', function() {
  return sass('src/styles/scss/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version', options.autoprefixer))
    .pipe(gulp.dest('src/styles/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});


gulp.task('images', function(cb) {
  return gulp.src('images/**/*')
    .pipe(imageop({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {
    return del(['dist/dist/css', 'dist/dist/js', 'dist/dist/img']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);


});