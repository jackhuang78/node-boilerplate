import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import watchify from 'watchify';
import browserify from 'browserify';
import babelify from 'babelify';
import mocha from 'gulp-mocha';
//import babel from 'babel-core/register';
//import jsdoc from 'gulp-jsdoc';
import shell from 'gulp-shell';

import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';
import gutil from 'gulp-util';


// test code
gulp.task('default', () => {
	console.log('default!');
});

// remove build and dist directory
gulp.task('clean', () => {
	return del(['build', 'dist']);
});

// run mocha test
gulp.task('test', () => {
	return gulp.src('src/test/**/*')
		.pipe(mocha({compiler: {js: babel}}));
});

gulp.task('start', () => {
	nodemon({
		watch: ['src/server/**/*', 'gulpfile.babel.js' ],
		script: 'build/server/start.js',
		env: {PORT: 9999},
		tasks: ['default']	// <-- wait for this to work...
	}).on('restart', () => {
		build();
	});
});

// build
function build() {
	console.log('build...');
  return gulp.src('src/server/**/*')
    .pipe(babel())
    .pipe(gulp.dest('build/server'));
};
gulp.task('build', build);



// bundle
var b = watchify(browserify({
	entries: ['src/client/main.js'],
	debug: true
})).transform(babelify);
b.on('update', bundle);
b.on('log', gutil.log);
function bundle() {
	return b.bundle()
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./build/client'));
};
gulp.task('bundle', bundle);


gulp.task('jsdoc', ['build'], shell.task([
	'node_modules/.bin/jsdoc -r -t node_modules/minami -d doc build/**/*.js'
]));


