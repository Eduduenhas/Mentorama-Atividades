const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'))
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const image = require('gulp-image');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');

const scssDir = './src/scss/*.sass'
const mainScss = './src/scss/main.sass'
const imagesDir = './src/images/*'

const initialTasks = ['sass', 'images', 'html-minify']

// HTML TASKS
gulp.task('html-minify', () => {
  return gulp.src('./src/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./public'));
});

// IMAGE TASKS
gulp.task('images', () =>
	gulp.src(imagesDir)
		.pipe(image())
		.pipe(gulp.dest('./public/images'))
		.pipe(browserSync.stream())
);

// STYLE TASKS
gulp.task('sass', () =>
	gulp.src(mainScss)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./public/css/'))
		.pipe(browserSync.stream({ match: '**/*.css' }))
);

// SERVER TASKS
gulp.task('browserSync', () => {
	browserSync.init({
		server: "./public/"
	});

	gulp.watch(scssDir, gulp.series(['sass']));
	gulp.watch(imagesDir, gulp.series(['images']));
	gulp.watch("./public/*.html").on('change', browserSync.reload);
})

// GULP TASKS
gulp.task('serve', gulp.series(initialTasks, 'browserSync'))

gulp.task('default', gulp.series(initialTasks))
