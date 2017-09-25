# statty

> A tiny and unobtrusive state management library for React and Preact apps

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

Most of the time I see colleagues of mine starting React projects setting up Redux + a bunch of middlewares and store enhancers by default, regardless of the project nature.

Despite Redux is awesome, [it's not always needed](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367) and it may slow down the process of onboarding new developers, especially if they are new to React and its ecosystem (I often saw colleagues being stuck for hours trying to understand what was the proper way to submit a simple form).

React already comes with a built-in state management mechanism, and the way to change state is called `setState()`. Local component state is just fine in most of the cases.

In real world apps we often have app state, and sometimes it becomes annoying to pass it down the entire component tree, along with callbacks to update it, via props.

## This solution

`Statty` is meant to be used to manage app-wide state and you can think of it as a simpliefied simplified version of Redux. 

It [safely](https://medium.com/@mweststrate/how-to-safely-use-react-context-b7e343eff076) leverages context to expose application state to children, along with a function to update it when needed.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Examples](#examples)
- [Inspiration](#inspiration)
- [LICENSE](#license)

## Installation

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

```jsx
import React from 'react'
import { render } from 'react-dom'
import { Provider, State } from 'statty'

// selector
const selector = state => ({ count: state.count })

// updaters

// only returns the slice of the state supposed to be updated
// new state will be shallowly merged with old state
const dec = state => ({ count: state.count - 1 })

// returns a complete new state
const inc = state => Object.assign({}, state, {count: state.count + 1 })

const Counter = () => 
  <State
    select={selector}
    render={(state, update) =>
      <div>
        <button onClick={() => update(dec)}>-</button>
        {state.count}
        <button onClick={() => update(inc)}>+</button>
      </div>}
  />

// initial state
const initialState = {
  count: 0
}

const App = () =>
  <Provider state={initialState}>
    <Counter />
  </Provider>

render(<App />, document.getElementById('root'))

```

The `<Provider>` component is used to shared the state via context.
The `<State>` component takes 2 props:

* `select` is a function that takes the entire state, and returns only the part of it that the children will need
* `render` is a [render prop](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) that takes the `selected state` and the `update` function as parameters, giving the user full control on what to render based on props and state.

State updates happen via special `updater` functions that take the old state as a parameter and return the new state, triggering a rerender.

An updater function may return the slice of the state that changed or an entire new state. In the first case the new slice will be shallowly merged with old state.

## API

### `<Provider>`

Makes state available to children `<State>`

#### props

##### `inspect`

> `object` | required

The initial state

##### `inspect`

> `function(oldState: object, newState: object, updaterFn: function)`

Use the inspect prop during development to track state changes.

`Statty` comes with a default logger inspired by redux-logger.

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

> `function(state: object, update: function) | required

A render prop that takes the state returned by the selector and an update function.

For the moment take a look at this playground https://codesandbox.io/s/o2rq7oJ0z.
More to come.

## Tests

```sh
$ npm run test
```

[MIT License](LICENSE.md) © [Alessandro Arnodo](https://alessandro.arnodo.net/)
