import * as statty from '../index'

test('exposes the public API', () => {
  const methods = Object.keys(statty)
  expect(methods.length).toBe(2)
  expect(methods).toContain('Provider')
  expect(methods).toContain('Connector')
})
