import React from 'react'
import { render } from 'enzyme'
import serializer from 'enzyme-to-json/serializer'
import { Provider, State } from '../index'

expect.addSnapshotSerializer(serializer)

test('Provider passes context down', () => {
  expect(
    render(
      <Provider state={{ state: 'ok' }}>
        <State
          render={(state, update) => <span>{JSON.stringify(state)}</span>}
        />
      </Provider>
    )
  ).toMatchSnapshot()
})
