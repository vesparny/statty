import buble from 'rollup-plugin-buble'
import fileSize from 'rollup-plugin-filesize'
import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

function makeDest (format) {
  return `dist/${pkg.name}.${format}${minify ? `.min` : ``}.js`
}

const minify = !!process.env.MINIFY
const pkg = require('./package.json')

let targets = [
  { file: makeDest('cjs'), format: 'cjs' },
  { file: makeDest('umd'), format: 'umd', name: pkg.name }
]

export default {
  input: 'src/index.js',
  useStrict: false,
  sourcemap: minify,
  external: ['react', 'prop-types'],
  globals: {
    react: 'React',
    'prop-types': 'PropTypes'
  },
  plugins: [
    resolve({
      jsnext: true
      // main: false,
      // browser: false
    }),
    commonjs(),
    buble(),
    minify ? uglify() : {},
    minify ? fileSize() : {}
  ],
  output: minify
    ? targets
    : targets.concat([{ file: makeDest('es'), format: 'es' }])
}
