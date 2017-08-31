import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

function makeDest (format) {
  return `dist/${pkg.name}.${format}${minify ? `.min` : ``}.js`
}

const minify = !!process.env.MINIFY
const pkg = require('./package.json')

let targets = [
  { dest: makeDest('cjs'), format: 'cjs' },
  { dest: makeDest('umd'), format: 'umd', moduleName: pkg.name }
]

export default {
  entry: 'src/index.js',
  useStrict: false,
  sourceMap: minify,
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
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        [
          'env',
          {
            modules: false,
            loose: true
          }
        ]
      ],
      plugins: ['external-helpers']
    }),
    minify ? uglify() : {}
  ],
  targets: minify
    ? targets
    : targets.concat([{ dest: makeDest('es'), format: 'es' }])
}
