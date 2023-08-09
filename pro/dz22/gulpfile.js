const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();

const sass = require('gulp-sass')(require('sass'));

function removeDist() {
    return gulp.src('./dist')
        .pipe(clean());
}

function minifyJS() {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
};

function watchMinifyJS() {
    return gulp.watch('./src/js/**/*.js', minifyJS)
}
 
function buildStyles() {
    return  gulp.src('./src/css/**/*.scss')
            .pipe(sass())
            .pipe(concatCss("./css/bundle.css"))
            .pipe(gulp.dest('./dist'))
            .pipe(browserSync.stream());
}

function watchStyles() {
    return gulp.watch('./src/css/**/*.scss', buildStyles)
}

function modeIndexHTML() {
    return gulp.src('./src/index.html')
            .pipe(gulp.dest('./dist'))
}

gulp.task('serve', function(){

    gulp.series(removeDist,modeIndexHTML, gulp.parallel(buildStyles, minifyJS));

    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch("./src/css/**/*.scss").on('change', function() {
        buildStyles();
        browserSync.stream();
    });
 
    gulp.watch("./src/*.html").on('change', function() {
        gulp.src('./src/*.html')
            .pipe(gulp.dest('./dist'));
        browserSync.reload();
    });

    gulp.watch('./src/js/**/*.js').on('change', function(){
        minifyJS();
        browserSync.reload();
    });

});


exports.buildStyles = buildStyles;
exports.watchStyles = watchStyles;
exports.minifyJS = minifyJS;
exports.watchMinifyJS = watchMinifyJS;
exports.modeIndexHTML = modeIndexHTML;
exports.removeDist = removeDist;

exports.build = gulp.series(modeIndexHTML, gulp.parallel(buildStyles, minifyJS));