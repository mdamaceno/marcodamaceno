var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var elixir = require('laravel-elixir');

elixir(function(mix) {
  mix.styles([
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './resources/assets/css/raleway.css',
    './resources/assets/css/ie10-viewport-bug-workaround.css',
    './resources/assets/css/blog.css'
  ], './dist/stylesheets/app.css');

  mix.scripts([
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './resources/assets/js/ie10-viewport-bug-workaround.js'
  ], './dist/js/app.js');

  mix.copy('./resources/assets/images/marcodamaceno.png', './dist/images');

  mix.task('build-html');
});

gulp.task('build-html', function() {
  var templateData = {
      firstName: 'Marco',
      lastName: 'Damaceno',
      slogan: 'Um programador Ruby e PHP',
      description: '',
      email: 'maadamaceno@gmail.com',
      image_path: 'images/marcodamaceno.png'
    },
    options = {
      ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
      batch: ['./resources/views/partials', './resources/views/contents'],
      helpers: {
        capitals: function(str) {
          return str.toUpperCase();
        }
      }
    }

  return gulp.src('./resources/views/*.handlebars')
    .pipe(handlebars(templateData, options))
    .pipe(rename(function(path) {
      path.extname = '.html';
    }))
    .pipe(gulp.dest('dist'));
});
