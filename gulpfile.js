var {src, dest, watch} = require('gulp')
var ts = require('gulp-typescript')
var tsProject = ts.createProject('./server/tsconfig.json');
const uglify = require('gulp-uglify');

function defaultTask() {
  return src('./server/**/*.ts')
    .pipe(tsProject())
    .pipe(uglify())
    .pipe(dest('output/'))
}
// watch('server/**/*.ts', {delay: 500}, defaultTask)

exports.default = defaultTask;
