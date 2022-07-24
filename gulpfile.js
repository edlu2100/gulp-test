const { src, dest, watch, series, parallel } = require("gulp");
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cssnano = require('gulp-cssnano');


//Sökvägar
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/**/*.css",
    jsPath: "src/**/*.js"
}


//HTML-task, kopierar filer
function copyHTML() {
    return src(files.htmlPath)
        .pipe(dest('pub'))
}

//Css-task, konkatinera
function cssTask() {
    return src(files.cssPath)
        .pipe(concat('main.css'))
        .pipe(cssnano())
        .pipe(dest('pub/css'))
}

//JS-task, konkatinera, minifiera
function jsTask() {
    return src(files.jsPath)
        .pipe(concat('main.js'))
        .pipe(terser())
        .pipe(dest('pub/js'));
}


//watcher
function watchTask() {
    watch([files.htmlPath, files.cssPath, files.jsPath], parallel(copyHTML, cssTask, jsTask))
}



exports.default = series(
    parallel(copyHTML, jsTask, cssTask),
    watchTask
);