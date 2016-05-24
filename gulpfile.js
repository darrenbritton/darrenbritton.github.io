var gulp = require('gulp');
var glob = require("glob");
var cache = require('gulp-cache');
var concat = require('gulp-concat');
var uncss = require('gulp-uncss');
var nano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var compilerPackage = require('google-closure-compiler');
var closureCompiler = compilerPackage.gulp();

gulp.task('compileJs', function() {

    glob("./*.html", function(err, files) {
        if (err) throw err;

        files.forEach(function(file) {
            var jsPaths = ['./js/shared/*.js'];
            var filename = file.substring(file.lastIndexOf('/') + 1, file.lastIndexOf('.'));
            var outputName = filename + '.min.js';
            jsPaths.push('./js/' + filename + '/*.js');

            return gulp.src(jsPaths, { base: './' })
                .pipe(closureCompiler({
                    compilation_level: 'SIMPLE',
                    js: './js/externs/jquery.min.js',
                    language_in: 'ECMASCRIPT6_STRICT',
                    language_out: 'ECMASCRIPT5_STRICT',
                    output_wrapper: '(function(){\n%output%\n}).call(this)',
                    js_output_file: outputName
                }))
                .pipe(gulp.dest('./compiled/js'));
        });
    });
});

gulp.task('compileCss', function(){
    glob("./*.html", function(err, files) {
        if (err) throw err;

        files.forEach(function(file) {
            var cssPaths = ['./css/shared/*.css'];
            var filename = file.substring(file.lastIndexOf('/') + 1, file.lastIndexOf('.'));
            var outputName = filename + '.min.css';
            cssPaths.push('./css/' + filename + '/*.css');

            return gulp.src(cssPaths, { base: './' })
                .pipe(concat(outputName))
                // .pipe(uncss({
                //     html: [filename + '.html']
                // }))
                .pipe(nano())
                .pipe(gulp.dest('./compiled/css'));
        });
    });
})

gulp.task('imageMin', function(){
  return gulp.src('./img/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin()))
  .pipe(gulp.dest('/img'))
});

gulp.task('browserSync', function() {
  browserSync.init();
});

gulp.task('watch', ['browserSync', 'compileCss'], function() {
    gulp.watch('./js/**/*.js', ['compileJs']);
    gulp.watch('./css/**/*.css', ['compileCss']);
    gulp.watch('./img/*', ['imageMin']);
});

gulp.task('default', ['watch']);
