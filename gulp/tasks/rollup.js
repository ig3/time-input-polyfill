'use strict'

import gulp from 'gulp'
import {
	plugins,
	args,
	taskTarget,
	browserSync,
	dirs,
	entries,
	join,
} from '../utils'
import rollup from 'rollup-stream'
import babel from 'rollup-plugin-babel'

import pkg from '../../package.json'
import path from 'path'
import glob from 'glob'
import vsource from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import gulpif from 'gulp-if'

import fileHeader from '../../core/static-values/header'

let cache = {}

const rollupJS = ({ entryFile, done, dest, rename = false, header = '' }) => {
	const startTime = new Date().getTime()
	return (
		rollup({
			input: entryFile,
			sourcemap: !args.production,
			cache: cache[entryFile],
			plugins: [babel()],
			// Intended for use with browsers
			format: 'iife',
			name: 'TimePolyfill_bundle',
		})
			.on('bundle', function(bundle) {
				// update cache data after every bundle is created
				cache[entryFile] = bundle
			})
			// point to the entry file.
			.pipe(vsource('main.js'))
			// we need to buffer the output, since many gulp plugins don't support streams.
			.pipe(buffer())
			.pipe(plugins.sourcemaps.init({ loadMaps: true }))
			// minify code if production mode
			.pipe(gulpif(args.production, plugins.terser()))
			.pipe(
				plugins.rename(function(filepath) {
					// Remove 'source' directory as well as prefixed folder underscores
					// Ex: 'src/_scripts' --> '/scripts'
					filepath.dirname = filepath.dirname.replace(
						dirs.source + '/',
						'',
					)
					if (rename) {
						filepath.basename = rename
					}
				}),
			)
			.pipe(plugins.header(header))
			.pipe(plugins.sourcemaps.write('.'))
			// and output to ./dist/app.js as normal.
			.pipe(gulp.dest(dest.replace(/^_|(\/)_/g, '$1')))
			.on('end', function() {
				var time = (new Date().getTime() - startTime) / 1000
				console.log(
					plugins.util.colors.cyan(entryFile) +
						' was compiled: ' +
						plugins.util.colors.magenta(time + 's'),
				)
				gulp.series('copy:dist')(done)
				return browserSync.reload('*.js')
			})
	)
}

const rollup_multiple_files = ({ src, done, dest, rename, header }) => {
	return glob(src, function(err, files) {
		if (err) done(err)
		return Promise.all(
			files.map(function(entryFile) {
				return rollupJS({ entryFile, done, dest, rename, header })
			}),
		)
	})
}

function dist_compile({ done, src, type = '', header }) {
	if (!args.production) return done()
	return rollup_multiple_files({
		src,
		done,
		dest: './dist',
		rename: 'time-input-polyfill' + type + '.min',
		header,
	})
}

// Rollup JS library
gulp.task('rollup:dist:manual', function(done) {
	return dist_compile({ done, src: './index.js', header: fileHeader })
})

// Rollup JS library
gulp.task('rollup:dist:auto', function(done) {
	return dist_compile({
		done,
		src: './auto.js',
		type: '.auto',
		header: [
			'// == TIME INPUT POLYFILL AUTO LOADER ==\n',
			'// This is not the actual time input polyfill. ',
			'This file checks for input[type=time] support.\n',
			'// If not supported, it will load the real polyfill, then ',
			'apply it to all input[type=time] elements.\n',
			'\n',
			'// The actual polyfill is found here:\n',
			`// https://cdn.jsdelivr.net/npm/time-input-polyfill@${
				pkg.version
			}/dist/time-input-polyfill.min.js\n\n`,
		].join(''),
	})
})

gulp.task(
	'rollup:dist',
	gulp.parallel('rollup:dist:manual', 'rollup:dist:auto'),
)

// Rollup demo site
gulp.task('rollup:site', function(done) {
	return rollup_multiple_files({
		src: './' + join(dirs.source, dirs.scripts, entries.js),
		dest: join('.', taskTarget, dirs.scripts),
		done,
	})
})

gulp.task('rollup', gulp.parallel('rollup:dist', 'rollup:site'))