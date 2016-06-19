var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var gulpsync = require('gulp-sync')(gulp);

var paths = {
    src:       './src',
    build:     'build',
    shortcuts: 'shortcuts',
    dist:      './dist'
};

gulp.task('min', function () {
    return gulp.src([
            path.join(paths.dist, 'cleave.js'),
            path.join(paths.dist, 'cleave-react.js')
        ])
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.join(paths.dist)));
});

gulp.task('js', function () {
    return gulp.src([
            path.join(paths.src, paths.build, 'prefix.js'),
            path.join(paths.src, 'Cleave.js'),
            path.join(paths.src, paths.shortcuts, '**/*.js'),
            path.join(paths.src, paths.build, 'expose.js'),
            path.join(paths.src, paths.build, 'suffix.js')
        ])
        .pipe(concat('cleave.js'))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build', gulpsync.sync(['js', 'js:react', 'min']));