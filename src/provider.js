import { Component } from 'react'
import PropTypes from 'prop-types'
import brcast from 'brcast'

class Provider extends Component {
  constructor (props, context) {
    super(props, context)
    this.broadcast = brcast(this.props.state)
  }

  getChildContext () {
    return {
      __statty__: this.broadcast
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

export default Provider
