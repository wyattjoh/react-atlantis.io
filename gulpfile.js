var gulp = require('gulp');
var react = require('gulp-react');

gulp.task('react', function () {
    return gulp.src('assets/src/js/*.js')
        .pipe(react())
        .pipe(gulp.dest('assets/dist/js'));
});

gulp.task('watch', function() {
    gulp.watch('assets/src/js/*.js', ['react']);
});

gulp.task('default', ['react', 'watch']);
