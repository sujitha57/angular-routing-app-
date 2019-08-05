const gulp = require("gulp");
const uglifycss = require("gulp-uglifycss");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();
gulp.task("css", function() {
  return gulp.src("./app/**/*.css")
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true,
    }))
    .pipe(gulp.dest("./dist/"))
    .pipe(browserSync.stream());
});

gulp.task("compressJs", () => {
  return gulp.src("./app/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist"));
});

gulp.task("reload", () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
});

/*gulp.task("run", gulp.series("css", "reload"));
gulp.task("watch", () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch("./css/!*.css", gulp.series("css"));
  gulp.watch("./!*.html").on("change", browserSync.reload);
});
gulp.task("default", gulp.series("run", "watch"));*/
