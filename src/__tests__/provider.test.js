import React from 'react'
import { render } from 'enzyme'
import serializer from 'enzyme-to-json/serializer'
import { Provider, Connector } from '../index'

expect.addSnapshotSerializer(serializer)

test('Provider passes context down', () => {
  expect(
    render(
      <Provider state={{ state: 'ok' }}>
        <Connector
          render={(state, update) => <span>{JSON.stringify(state)}</span>}
        />
      </Provider>
    )
  ).toMatchSnapshot()
})
