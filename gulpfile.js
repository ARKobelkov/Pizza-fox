var gulp = require('gulp');
var sass = require('gulp-dart-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var mediaQueries = require('gulp-group-css-media-queries');
var gulpIf = require('gulp-if');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var fileinclude = require('gulp-file-include');
var babel = require('gulp-babel');
var del = require('del');
var browserSync = require('browser-sync').create();

var mode = (process.env.NODE_ENV === 'production') ? 'production' : process.env.NODE_ENV;

gulp.task('styles', function() {
	return gulp.src('src/scss/**/*.s{a,c}ss')
		.pipe(plumber())
		.pipe(gulpIf(mode === 'development', sourcemaps.init({
			largeFile: true
		})))
		.pipe(sass())
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(mediaQueries())
		.pipe(gulpIf(mode !== 'development', cleanCss({
			format: (mode === 'production') ? false : 'beautify'
		})))
		.pipe(gulpIf(mode === 'development', sourcemaps.write('.')))
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.stream());
});

gulp.task('html', function() {
	return gulp.src('src/*.html')
		.pipe(plumber())
		.pipe(fileinclude({
			indent: true,
			prefix: '@',
			suffix: ';'
		}))
		.pipe(useref())
		.pipe(gulpIf(mode === 'production' && '*.js', uglify()))
		.pipe(gulpIf(mode !== 'development' && '*.css', cleanCss({
      format: (mode === 'production') ? false : 'beautify'
    })))
		.pipe(gulp.dest('dist/'));
});

gulp.task('javascript', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(plumber())
		.pipe(gulpIf(mode === 'development', sourcemaps.init({
			largeFile: true
		})))
		.pipe(babel())
		.pipe(gulpIf(mode === 'production', uglify()))
		.pipe(gulpIf(mode === 'development', sourcemaps.write('.')))
		.pipe(gulp.dest('dist/js/'))
		.pipe(browserSync.stream());
});

gulp.task('assets', function() {
	return gulp.src('src/assets/**')
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream());
});

gulp.task('clear', function() {
	return del('dist/');
});

gulp.task('watcher', function() {
	gulp.watch('src/scss/**/*.s{a,c}ss', gulp.series('styles'));
	gulp.watch('src/**/*.html', gulp.series('html'))
		.on('change', function(path, stats) {
      browserSync.reload();
    });
	gulp.watch('src/assets/**/*.*', gulp.series('assets'));
	gulp.watch('src/js/**/*.js', gulp.series('javascript'));
});

gulp.task('server', function() {
	browserSync.init({
    server: {
      baseDir: 'dist/'
    }
  });
});

gulp.task('build', gulp.series('clear', gulp.parallel('styles', 'html', 'javascript', 'assets')));

if (mode !== 'development') {
	gulp.task('default', gulp.series('build'));
} else {
	gulp.task('default', gulp.series('build', gulp.parallel('watcher', 'server')));
}