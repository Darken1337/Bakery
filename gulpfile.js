const gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	pug = require('gulp-pug'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	cleanCss = require('gulp-clean-css'),
	del = require('del'),
	uglify = require('gulp-uglify-es').default,
	replace = require('gulp-replace'),
	svgSprite = require('gulp-svg-sprite'),
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio');


	gulp.task('clean', () => {

		return del('./dist')

	});

	gulp.task('svg', () => {
		return gulp.src('./app/images/svg/*.svg')
			.pipe(svgmin({
				js2svg: {
					pretty: true
				}
			}))
			.pipe(replace('&gt;', '>'))
			.pipe(svgSprite({
				mode: {
					symbol: {
						sprite: "sprites.svg"
					}
				}
			}))
			.pipe(gulp.dest('./dist/images/svg'));
	});

	gulp.task('img', () => {
		return gulp.src('./app/images/*.{png,jpeg,gif,jpg}')
		.pipe(gulp.dest('./dist/images'))
	})

	gulp.task('templates', () => {

		return gulp.src('app/index.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream: true
		}))
	});

	gulp.task('fonts', () => {

		return gulp.src('app/fonts/**/*')
			.pipe(gulp.dest('dist/fonts'))
	});

	gulp.task('sass', () => {
		return gulp.src('app/sass/styles.sass')
		.pipe(sass())
		.pipe(autoprefixer([
			'last 15 versions'
		]))
		.pipe(cleanCss())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
	});

	gulp.task('styles:libs', () => {
		return gulp.src('app/libs/css/*.css')
			.pipe(cleanCss())
			.pipe(rename({
				extname: '.min.css'
			}))
			.pipe(gulp.dest('dist/libs/css'))
	})

	gulp.task('scripts:libs', () => {
		return gulp.src('app/libs/js/*.js')
			.pipe(uglify())
			.pipe(rename({
				extname: '.min.js'
			}))
			.pipe(gulp.dest('dist/libs/js'))
	})

	gulp.task('scripts', () => {
		return gulp.src('app/js/*.js')
			.pipe(uglify())
			.pipe(rename({
				extname: '.min.js'
			}))
			.pipe(gulp.dest('dist/js'))
			.pipe(browserSync.reload({ 
				stream: true 
			}))
	})

	gulp.task('watch', () =>{
		gulp.watch('./app/sass/**/*.sass', gulp.parallel('sass'));
		gulp.watch('./app/index.pug', gulp.parallel('templates'));
		gulp.watch('./app/js/*.js', gulp.parallel('scripts'));
	});

	gulp.task('browser-sync', () => {
		browserSync.init({
			injectChanges: true,
			server: "./dist"
		})
	});

	gulp.task('default', gulp.series( 'clean',
		gulp.parallel('watch', 'img', 'browser-sync', 'sass', 'scripts', 'templates', 'fonts', 'styles:libs', 'scripts:libs', 'svg')))