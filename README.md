# statty
> A tiny and discrete state management library for react and preact apps

[![Travis](https://img.shields.io/travis/vesparny/statty.svg)](https://travis-ci.org/vesparny/statty)
[![Code Coverage](https://img.shields.io/codecov/c/github/vesparny/statty.svg?style=flat-square)](https://codecov.io/github/vesparny/statty)
[![David](https://img.shields.io/david/vesparny/statty.svg)](https://david-dm.org/vesparny/statty)
[![npm](https://img.shields.io/npm/v/statty.svg)](https://www.npmjs.com/package/statty)
[![npm](https://img.shields.io/npm/dm/statty.svg)](https://npm-stat.com/charts.html?package=statty&from=2017-05-19)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![MIT License](https://img.shields.io/npm/l/statty.svg?style=flat-square)](https://github.com/vesparny/statty/blob/master/LICENSE)

The current size of `statty/dist/statty.umd.min.js` is:

[![gzip size](http://img.badgesize.io/https://unpkg.com/statty/dist/statty.umd.min.js?compression=gzip&label=gzip%20size&style=flat-square)](https://unpkg.com/statty/dist/)

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```sh
$ npm i statty
```

Then with a module bundler like [rollup](http://rollupjs.org/) or [webpack](https://webpack.js.org/), use as you would anything else:

```javascript
// using ES6 modules
import statty from 'statty'

// using CommonJS modules
var statty = require('statty')
```

The [UMD](https://github.com/umdjs/umd) build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/statty/dist/statty.umd.js"></script>
```

You can find the library on `window.statty`.

## Usage

For the moment take a look at this playground https://codesandbox.io/s/o2rq7oJ0z.
More to come.

## Tests

```sh
$ npm run test
```

[MIT License](LICENSE.md) © [Alessandro Arnodo](https://alessandro.arnodo.net/)
