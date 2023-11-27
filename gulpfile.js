let preprocessor = 'sass';
const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const clean = require('gulp-clean');

function browsersync() {
	browserSync.init({
		server: { baseDir: 'app/' },
		notify: false,
		online: true
	})
}
 
function scripts() {
	return src([
		'app/js/main.js',
		])
	.pipe(concat('app.min.js'))
	.pipe(uglify())
	.pipe(dest('app/js/'))
	.pipe(browserSync.stream())
}
 
function styles() {
	return src('app/styles/*.scss')
	.pipe(eval(preprocessor)())
	.pipe(concat('app.min.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(cleancss( { level: { 1: { specialComments: 0 } } } ))
	.pipe(dest('app/css/'))
	.pipe(browserSync.stream())
}

function buildcopy() {
	return src([
		'app/css/**/*.min.css',
		'app/js/**/*.min.js',
		'app/images/**/*',
		'app/**/*.html',
		], { base: 'app' })
	.pipe(dest('dist'))
}
 
function cleandist() {
	return src('dist', {allowEmpty: true}).pipe(clean())
}
 
function startwatch() {
	watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
	watch('app/styles/*.scss', styles);
	watch('app/**/*.html').on('change', browserSync.reload);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;

exports.build = series(cleandist, styles, scripts, buildcopy);
exports.default = parallel(styles, scripts, browsersync, startwatch);