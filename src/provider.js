import { Component } from 'react'
import PropTypes from 'prop-types'
import brcast from 'brcast'

class Provider extends Component {
  constructor (props, context) {
    super(props, context)
    this.broadcast = brcast(props.state)
    this.debug = brcast(props.debug)
  }

  getChildContext () {
    return {
      __statty__: {
        broadcast: this.broadcast,
        debug: this.debug
      }
    }
  }

  render () {
    const c = this.props.children
    return Array.isArray(c) ? c[0] : c
  }
}

Provider.childContextTypes = {
  __statty__: PropTypes.object
}

Provider.propTypes = {
  debug: PropTypes.bool,
  state: PropTypes.object
}

export default Provider
