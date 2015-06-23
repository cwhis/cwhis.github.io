//gulp 运行
//gulp运行具体一个任务 gulp 任务名称

var gulp = require('gulp');
var coffee = require('gulp-coffee');
var sass = require('gulp-sass');
var	del = require('del');

//创建任务
gulp.task('sass', function() {
    gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('styles'));
});
gulp.task('watch',function(){
	gulp.watch('sass/*.scss', function(){
	    gulp.run('sass');
	});
})
gulp.task('default', function(){
    gulp.run('sass','watch');
});

