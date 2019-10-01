'use strict';
 
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
	//postcss = require('gulp-postcss'),
    //cssnext = require("gulp-cssnext"),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
	babel = require('gulp-babel'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/images/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.jade',
        js: 'src/js/functions.js',
        style: 'src/css/screen.scss',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.jade',
        js: 'src/js/**/*.js',
        style: 'src/css/screen.scss',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};    

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9401,
    logPrefix: "Frontend_Devil"
};
 
gulp.task('webserver', function () {
    browserSync(config);
});
 
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});
 
gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});
 
gulp.task('js:build', function () {
    gulp.src(path.src.js) 
		.pipe(rigger()) 
        .pipe(babel({
            presets: ['es2015', 'babel-preset-stage-2']
        }))
		//.pipe(sourcemaps.init()) 
        .pipe(uglify())
        //.pipe(sourcemaps.write()) 
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});
 
gulp.task('style:build', function () {
    gulp.src(path.src.style) 
		//.pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
		/*.pipe(postcss([
			require("postcss-cssnext")(),
			require("postcss-import"),
            require('postcss-nested')
		]))*/
        .pipe(prefixer())
        //.pipe(cssmin({compatibility: 'ie8'}))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});
 
gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});
 
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});
 
gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);
 
 
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    // watch([path.watch.js], function(event, cb) {
    //     gulp.start('js:build');
    // });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});
 
 
gulp.task('default', ['build', 'webserver', 'watch']);