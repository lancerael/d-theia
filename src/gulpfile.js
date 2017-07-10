const gulp = require('gulp');
const intestify = require('intestify');

let changedSpec = null;

/*
 * Run all specs, then, on watch:
 *  if a spec changes, run only that spec
 *  if src changes, run all specs
 */

gulp.task('test', (done) => {
  const options = { callback: done };

  if (changedSpec) {
    options.spec = changedSpec;
  }

  intestify(options);

  changedSpec = null;
})

gulp.task('watch', () => {
  gulp.watch('src/*.js').on('change', () => {
    gulp.start('test');
  })

  gulp.watch('test/spec/*.js').on('change', (event) => {
    changedSpec = event.path;
    gulp.start('test');
  })
});

gulp.task('default', ['test', 'watch']);
