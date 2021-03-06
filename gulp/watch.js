'use strict'

var path = require('path')

module.exports = function(
  gulp,
  plugins,
  args,
  config,
  taskTarget,
  browserSync,
) {
  var dirs = config.directories

  // Watch task
  gulp.task('watch', function() {
    // Styles
    gulp.watch(
      [
        path.join(dirs.source, dirs.styles, '**/*.{scss,sass}'),
        path.join(dirs.source, dirs.modules, '**/*.{scss,sass}'),
      ],
      ['sass'],
    )

    // Pug Templates
    gulp.watch(
      [
        path.join(dirs.source, '**/*.pug'),
        path.join(dirs.source, dirs.data, '**/*.{json,yaml,yml}'),
      ],
      ['pug'],
    )

    // Copy
    gulp.watch(
      [
        path.join(dirs.source, '**/*'),
        '!' + path.join(dirs.source, '{**/_*,**/_*/**}'),
        '!' + path.join(dirs.source, '**/*.pug'),
      ],
      ['copy'],
    )

    // Images
    gulp.watch(
      [path.join(dirs.source, dirs.images, '**/*.{jpg,jpeg,gif,svg,png}')],
      ['imagemin'],
    )

    // All other files
    gulp
      .watch([
        path.join(dirs.temporary, '**/*'),
        '!' + path.join(dirs.temporary, '**/*.{css,map,html,js}'),
      ])
      .on('change', browserSync.reload)
  })
}
