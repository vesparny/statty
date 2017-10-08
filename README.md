# statty

> A tiny and unobtrusive state management library for React and Preact apps

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/aF8QWaPs78PSySxWPHXXNThZ/vesparny/statty'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/aF8QWaPs78PSySxWPHXXNThZ/vesparny/statty.svg' />
</a>

[![Travis](https://img.shields.io/travis/vesparny/statty.svg)](https://travis-ci.org/vesparny/statty)
[![Code Coverage](https://img.shields.io/codecov/c/github/vesparny/statty.svg?style=flat-square)](https://codecov.io/github/vesparny/statty)
[![David](https://img.shields.io/david/vesparny/statty.svg)](https://david-dm.org/vesparny/statty)
[![npm](https://img.shields.io/npm/v/statty.svg)](https://www.npmjs.com/package/statty)
[![npm](https://img.shields.io/npm/dm/statty.svg)](https://npm-stat.com/charts.html?package=statty&from=2017-05-19)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![MIT License](https://img.shields.io/npm/l/statty.svg?style=flat-square)](https://github.com/vesparny/statty/blob/master/LICENSE)

The current size of `statty/dist/statty.umd.min.js` is:

[![gzip size](http://img.badgesize.io/https://unpkg.com/statty/dist/statty.umd.min.js?compression=gzip&label=gzip%20size&style=flat-square)](https://unpkg.com/statty/dist/)

## The problem

Most of the time, I see colleagues starting React projects setting up Redux + a bunch of middlewares and store enhancers by default, regardless of the project nature.

Despite Redux being awesome, [it's not always needed](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367) and it may slow down the process of onboarding new developers, especially if they are new to the React ecosystem (I have often seen colleagues being stuck for hours trying to understand what was the proper way to submit a simple form).

React already comes with a built-in state management mechanism, `setState()`. Local component state is just fine in most of the cases.

In real world apps we often have app state, and sometimes it becomes annoying to pass it down the entire component tree, along with callbacks to update it, via props.

## This solution

`statty` is meant to manage app-wide state and can be thought of as a simplified version of Redux.

It [safely](https://medium.com/@mweststrate/how-to-safely-use-react-context-b7e343eff076) leverages context to expose application state to children, along with a function to update it when needed.

The update function acts like Redux dispatch, but instead of an action, it takes an `updater` function as a parameter that returns the new state.

This way it's easy to write testable updaters and to organize them as you prefer, without having to write boilerplate code.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Examples](#examples)
- [Inspiration](#inspiration)
- [LICENSE](#license)

## Installation

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Check them out if you don't have them locally installed.

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

```jsx
// https://codesandbox.io/s/rzpxx0w34
import React from 'react'
import { render } from 'react-dom'
import { Provider, State } from 'statty'
import inspect from 'statty/inspect'

// selector is a function that returns a slice of the state
// if not specified it defaults to f => f
const selector = state => ({ count: state.count })

// updaters

// updaters MUST be pure and return a complete new state,
// like Redux reducers
const onDecrement = state => 
  Object.assign({}, state, { count: state.count - 1 })

const onIncrement = state =>
  Object.assign({}, state, { count: state.count + 1 })

// Counter uses a <State> component to access the state
// and the update function used to execute state mutations
const Counter = () => (
  <State
    select={selector}
    render={({ count }, update) => (
      <div>
        <span>Clicked: {count} times </span>
        <button onClick={() => update(onIncrement)}>+</button>{' '}
        <button onClick={() => update(onDecrement)}>-</button>{' '}
      </div>
    )}
  />
)

// initial state
const initialState = {
  count: 0
}

// The <Provider> component is supposed to be placed at the top
// of your application. It accepts the initial state and an inspect function
// useful to log state mutatations during development
// (check your dev tools to see it in action)
const App = () => (
  <Provider state={initialState} inspect={inspect}>
    <Counter />
  </Provider>
)

render(<App />, document.getElementById('root'))


```

The `<Provider>` component is used to share the state via context.
The `<State>` component takes 2 props:

* `select` is a function that takes the entire state, and returns only the part of it that the children will need
* `render` is a [render prop](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) that takes the `selected state` and the `update` function as parameters, giving the user full control on what to render based on props and state.

State updates happen via special `updater` functions that take the old state as a parameter and return the new state, triggering a rerender.

An updater function may return the slice of the state that changed or an entire new state. In the first case the new slice will be shallowly merged with old state.

## API

### `<Provider>`

Makes state available to children `<State>`

#### props

##### `state`

> `object` | required

The initial state

##### `inspect`

> `function(oldState: object, newState: object, updaterFn: function)`

Use the inspect prop during development to track state changes.

`statty` comes with a default logger inspired by redux-logger.

```jsx
<Provider
  state={{count: 0}}
  inspect={require('statty/inspect')}
/>
```

### `<State>`

Connects children to state changes, and provides them with the `update` function

#### props

##### `select`

> `function(state: object) | defaults to s => s | returns object`

Selects the slice of the state needed by the children components.

##### `render`

> `function(state: object, update: function)` | required

A render prop that takes the state returned by the `selector` and an `update` function.


## Examples

Examples exist on [codesandbox.io](https://codesandbox.io/search?refinementList%5Btags%5D%5B0%5D=statty%3Aexample&page=1):

- [Counter](https://codesandbox.io/s/rzpxx0w34)
- [Preact example without Preact compat (codepen)](https://codepen.io/vesparny/pen/gGgyVN)
- [Counter with reducer](https://codesandbox.io/s/jp9zj98l5w)
- [Counter with async interactions](https://codesandbox.io/s/kxkp47o597)
- [Wikipedia searchbox with RxJS and Ramda](https://codesandbox.io/s/7wx3v8jqqq)
- [Wikipedia searchbox + Downshift integration](https://codesandbox.io/s/pymj32z5kj)
- [Tree-view example](https://codesandbox.io/s/3y146z2qop) (shows how to get good performance with nested subscriptions).

If you would like to add an example, follow these steps:

1) Fork this [codesandbox](https://codesandbox.io/s/rzpxx0w34)
2) Make sure your version (under dependencies) is the latest available version
3) Update the title and description
4) Update the code for your example (add some form of documentation to explain what it is)
5) Add the tag: `statty:example`

## Inspiration

* [Michael Jackson](https://github.com/mjackson)'s post on [render props](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)
* [refunk](https://github.com/jxnblk/refunk/)

## Tests

```sh
$ npm run test
```

## LICENSE

[MIT License](LICENSE.md) © [Alessandro Arnodo](https://alessandro.arnodo.net/)
