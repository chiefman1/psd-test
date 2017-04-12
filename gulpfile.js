'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: { //Build - folder for compressed and builded files. Project runs from here
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
		states: 'build/states/'
    },
    src: { //Source code path
        html: 'src/*.html', //Syntax src/*.html tells that we're using all .html files in directory
        js: 'src/js/main.js',//Using only main files for scripts and styles
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*', //Syntax img/**/*.* means - that we're taking all files from folder and all sub-folders
        fonts: 'src/fonts/**/*.*',
		states: 'src/template/states/*.html'
    },
    watch: { //Files for watcher definition
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 4000,
    logPrefix: "chiefman"
};

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Build html using rigger
        .pipe(gulp.dest(path.build.html))//..in build folder
        .pipe(reload({stream: true})); //and lets then reload server
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)//main.js
        .pipe(rigger()) // build with rigger
        .pipe(sourcemaps.init()) //sourcemap initialising
        .pipe(uglify()) //js compress
        .pipe(sourcemaps.write()) //and add sourcemap
        .pipe(gulp.dest(path.build.js)) //put result in build folder
        .pipe(reload({stream: true})); //and  reload server
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) // main.scss
        .pipe(sourcemaps.init()) //sourcemap initialising
        .pipe(sass()) //Compile to css
        .pipe(prefixer()) //add vendor prefixes
        .pipe(cssmin()) //compress
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //build
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //imgs
        .pipe(imagemin({ //compress
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //to build folder
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('states:build', function() {
    gulp.src(path.src.states)
        .pipe(gulp.dest(path.build.states))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
   'states:build'
    //'image:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);