import React from 'react'
import { mount } from 'enzyme'
import serializer from 'enzyme-to-json/serializer'
import { Provider, State } from '../index'
import { CHANNEL } from '../constants'

expect.addSnapshotSerializer(serializer)

const increment = state => ({ count: state.count + 1 })
const getMockedContext = unsubscribe => ({
  [CHANNEL]: {
    getState: () => {},
    setState: () => {},
    subscribe: () => unsubscribe
  }
})

test('State updates global state', () => {
  const state = { count: 0 }
  const wrapper = mount(
    <Provider state={state}>
      <State
        children={(state, update) =>
          <button onClick={() => update(increment)}>
            {state.count}
          </button>}
      />
    </Provider>
  )
  expect(wrapper).toMatchSnapshot(`with count = 0`)
  wrapper.find('button').simulate('click')
  expect(wrapper).toMatchSnapshot(`with count = 1`)
})

test('State updates local state', () => {
  const wrapper = mount(
    <Provider state={{ count: 0 }}>
      <State
        state={{ count: 10 }}
        children={(state, update) =>
          <button onClick={() => update(increment)}>
            {state.count}
          </button>}
      />
    </Provider>
  )
  expect(wrapper).toMatchSnapshot(`with count = 10`)
  wrapper.find('button').simulate('click')
  expect(wrapper).toMatchSnapshot(`with count = 11`)
})

test('State returns a portion of the state based on a selector function', () => {
  const selector = state => ({ data: state.data })
  const wrapper = mount(
    <Provider state={{ count: 0, data: [] }}>
      <State
        select={selector}
        children={(state, update) =>
          <span>
            {JSON.stringify(state)}
          </span>}
      />
    </Provider>
  )
  expect(wrapper).toMatchSnapshot(`with selector`)
})

test('State returns null in case no children are provided', () => {
  const wrapper = mount(
    <Provider state={{ count: 0 }}>
      <State />
    </Provider>
  )
  expect(wrapper).toMatchSnapshot(`with no children`)
})

test('unsubscribes from state updates on unmount', () => {
  const unsubscribe = jest.fn()
  const context = getMockedContext(unsubscribe)
  const wrapper = mount(<State children={(state, update) => <span />} />, {
    context
  })
  wrapper.unmount()
  expect(unsubscribe).toHaveBeenCalled()
})
