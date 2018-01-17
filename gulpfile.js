var gulp = require("gulp");
var sass = require("gulp-sass");
//创建任务（发布任务）
gulp.task("styles",function(){
    return gulp.src("sass/*.scss").pipe(sass({style:"nested" })).pipe(gulp.dest("public/stylesheets"));
})
//发布一个监听任务
gulp.task("watch",function(){
    gulp.watch("sass/*.scss",["styles"]);
})