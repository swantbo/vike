const {src, dest} = require('gulp')
const ts = require('gulp-typescript')
const uglify = require('gulp-uglify');

function defaultTask() {
  return src('./server/**/*.ts')
    .pipe(ts({
      noImplicitAny: true,
      outFile: 'output.js'
    }))
    .pipe(uglify())
    .pipe(dest('output/'))
}
exports.default = defaultTask;
