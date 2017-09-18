// to be used during development only ofc
module.exports = function inspect (oldState, newState, updaterFn) {
  try {
    console.group(
      '%c statty%c ' + (updaterFn.name || 'Anonymous updater'),
      'color: #AAAAAA',
      'color: #001B44'
    )
  } catch (e) {
    console.log('action')
  }
  console.log('%c old state', 'color: #E7040F', oldState)
  console.log('%c new state', 'color: #19A974', newState)
  try {
    console.groupEnd()
  } catch (e) {
    console.log('== end ==')
  }
}
