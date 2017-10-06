import React from 'react'
import Enzyme, { mount } from 'enzyme'
import serializer from 'enzyme-to-json/serializer'
import { Provider, State } from '../index'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const CHANNEL = '__statty__'

expect.addSnapshotSerializer(serializer)

const increment = state => ({ count: state.count + 1 })
const getMockedContext = () => ({
  [CHANNEL]: {
    broadcast: {
      getState: () => {},
      setState: () => {},
      subscribe: () => 1,
      unsubscribe: jest.fn()
    }
  }
})

test('Connector updates global state', () => {
  const state = { count: 0 }
  const wrapper = mount(
    <Provider state={state}>
      <State
        render={(state, update) => (
          <button onClick={() => update(increment)}>{state.count}</button>
        )}
      />
    </Provider>
  )
  expect(wrapper).toMatchSnapshot(`with count = 0`)
  wrapper.find('button').simulate('click')
  expect(wrapper).toMatchSnapshot(`with count = 1`)
})

test('Connector updates local state', () => {
  const wrapper = mount(
    <Provider state={{ count: 0 }}>
      <State
        state={{ count: 10 }}
        render={(state, update) => (
          <button onClick={() => update(increment)}>{state.count}</button>
        )}
      />
    </Provider>
  )
  expect(wrapper).toMatchSnapshot(`with count = 10`)
  wrapper.find('button').simulate('click')
  expect(wrapper).toMatchSnapshot(`with count = 11`)
})

test('Connector returns a slice of the state based on a selector function', () => {
  const selector = state => ({ data: state.data })
  const wrapper = mount(
    <Provider state={{ count: 0, data: [] }}>
      <State
        select={selector}
        render={(state, update) => <span>{JSON.stringify(state)}</span>}
      />
    </Provider>
  )
  expect(wrapper).toMatchSnapshot(`with selector`)
})

test('Connector returns null in case no render prop is provided', () => {
  const wrapper = mount(
    <Provider state={{ count: 0 }}>
      <State />
    </Provider>
  )
  expect(wrapper).toMatchSnapshot(`with no render prop`)
})

test('unsubscribes from state updates on unmount', () => {
  const context = getMockedContext()
  const wrapper = mount(<State render={(state, update) => <span />} />, {
    context
  })
  wrapper.unmount()
  expect(context[CHANNEL].broadcast.unsubscribe).toHaveBeenCalled()
})
