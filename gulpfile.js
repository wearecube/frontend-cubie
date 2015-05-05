// Requirements
// ------------------------
var gulp = require('gulp'),

  // Utils
  rename = require('gulp-rename'),
  header = require('gulp-header'),
  inject = require('gulp-inject'),
  concat = require('gulp-concat'),
  
  // Template
  minifyHTML = require('gulp-minify-html'),
  wiredep = require('wiredep').stream,
  svgstore = require('gulp-svgstore'),
  
  // Images
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  
  // Scripts
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  uglify = require('gulp-uglify'),

  // Styles
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  minifyCSS = require('gulp-minify-css'),
  
  // Doc
  hologram = require('gulp-hologram'),
  
  // Server
  browserSync = require('browser-sync'),

  // SEO
  sitemap = require('gulp-sitemap');


// Settings
// ------------------------
var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');

var src = './src/',
  dist = './app/',
  package = require('./package.json'),
  reload = browserSync.reload;


// Gulp Tasks
// ------------------------


// COPY
// Copy extra files like .htaccess, robots.txt
gulp.task('copy', function () {
  return gulp.src(['./.htaccess', './robots.txt'])
    .pipe(gulp.dest(dist));
});


// TEMPLATE
// Bower css and scripts inject +  SVG Sprite inject
gulp.task('template', function () {

  var svgs = gulp
    .src(src + 'assets/icons/*.svg')
    .pipe(svgstore({ inlineSvg: true }));

  function fileContents (filePath, file) {
    return file.contents.toString();
  }

  return gulp.src(src + '*.html')
    .pipe(wiredep({
      includeSelf: true
    }))
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(minifyHTML({
      conditionals: true,
      spare: true
    }))
    .pipe(gulp.dest(dist))
    .pipe(reload({
      stream: true
    }));
});


// IMAGES
// Optimization
gulp.task('images', function () {
  return gulp.src(src + 'assets/images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(dist + 'assets/images/'))
    .pipe(reload({
      stream: true
    }));
});


// SCRIPTS
// JSHint, Uglify
gulp.task('scripts', function () {
  return gulp.src([src + 'scripts/*.js'])
    .pipe(concat('main.min.js'))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(uglify())
    .pipe(gulp.dest(dist + 'scripts'))
    .pipe(reload({
      stream: true
    }));
});
// Bower components main scripts files
gulp.task('vendors', function() {
  var vendorsJS = require('wiredep')().js;
  return gulp.src(vendorsJS)
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist+'scripts'));
});


// STYLES
// LibSass, Minified
gulp.task('styles', function () {
  return gulp.src(src + 'styles/{,*/}*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(wiredep())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(header(banner, {
      package: package
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist + 'styles'))
    .pipe(reload({
      stream: true
    }));
});


// DOC
// Hologram: http://www.wearecube.ch/maintaining-living-style-guides-with-hologram/
gulp.task('doc', function () {
  return gulp.src('hologram_config.yml')
    .pipe(hologram())
    .pipe(reload({
      stream: true
    }));
});


// SERVER
// Browser Sync
gulp.task('serve', function () {
  return browserSync.init(null, {
    server: {
      baseDir: dist,
      routes: {
        "/bower_components": "bower_components"
      }
    }
  });
});


// SEO
// Generate a Sitemap
gulp.task('sitemap', function () {
  return gulp.src(dist+'/*.html')
    .pipe(sitemap({
      siteUrl: 'http://www.wearecube.ch/frontendcubie/'
    }))
    .pipe(gulp.dest(dist));
});


// Gulp Default Task
// ------------------------
// Having watch within the task ensures that 'sass' has already ran before watching
gulp.task('default', ['copy', 'vendors', 'template', 'images', 'scripts', 'styles', 'doc', 'sitemap', 'serve'], function () {
  gulp.watch(src + '{,*/}*.html', ['template']);
  gulp.watch(src + 'assets/icons/*.svg', ['template']);
  gulp.watch(src + 'scripts/*.js', ['scripts']);
  gulp.watch(src + 'assets/images/*', ['images']);
  gulp.watch(src + 'styles/{,*/}*.{scss,sass}', ['styles', 'doc']);
  gulp.watch(src + 'styles/styleguide.md', ['doc']);
});